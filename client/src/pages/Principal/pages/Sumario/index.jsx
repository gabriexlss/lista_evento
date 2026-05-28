import './Sumario.css'
import { Check, Clock, LoaderCircle } from 'lucide-react'
import SumarioItem from '../../../../components/SumarioItem'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import EventosAPI from '../../../../api/eventos.api'
import PessoasAPI from '../../../../api/pessoas.api'
import ItensAPI from '../../../../api/itens.api'

const formatCurrency = (value) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(Number(value) || 0)

const formatCurrencyParts = (value) => {
  const formatted = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value) || 0)
  const [intPart, decimalPart = '00'] = formatted.split(',')
  return { intPart, decimalPart }
}

const getInitials = (name) => {
  if (!name) return ''
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
}

const Sumario = () => {
  const { eventoId } = useParams()
  const [evento, setEvento] = useState(null)
  const [pessoas, setPessoas] = useState([])
  const [itens, setItens] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadDados = useCallback(async (currentEventId) => {
    setLoading(true)
    try {
      const [eventoData, pessoasData, itensData] = await Promise.all([
        EventosAPI.getEvento(currentEventId),
        PessoasAPI.getPessoasByEvento(currentEventId),
        ItensAPI.getItensByEvento(currentEventId),
      ])
      setEvento(eventoData)
      setPessoas(pessoasData)
      setItens(itensData)
      setError('')
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
      setError('Algo deu errado ao carregar o resumo.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!eventoId) return
    const timeoutId = setTimeout(() => loadDados(eventoId), 0)
    return () => clearTimeout(timeoutId)
  }, [eventoId, loadDados])

  const itemsByPerson = useMemo(() => {
    const map = new Map()
    itens.forEach((item) => {
      const list = map.get(item.person_id) || []
      list.push(item)
      map.set(item.person_id, list)
    })
    return map
  }, [itens])

  if (!eventoId) {
    return (
      <div className="Sumario">
        <p>Evento nao encontrado.</p>
      </div>
    )
  }

  const rodizioPrice = Number(evento?.rodizio_price || 0)
  const birthdayPeople = pessoas.filter((pessoa) => pessoa.is_birthday)
  const birthdayTotal = birthdayPeople.reduce((acc, pessoa) => {
    const personItems = itemsByPerson.get(pessoa.id) || []
    const itemsTotal = personItems.reduce(
      (sum, item) => sum + Number(item.unit_price || 0) * Number(item.quantity || 0),
      0,
    )
    return acc + itemsTotal + rodizioPrice
  }, 0)
  const shareCount = Math.max(pessoas.length - birthdayPeople.length, 0)
  const birthdayShare = shareCount > 0 ? birthdayTotal / shareCount : 0

  const pessoasResumo = pessoas.map((pessoa) => {
    const personItems = itemsByPerson.get(pessoa.id) || []
    const itensDetalhe = []
    let itemsTotal = 0

    if (rodizioPrice > 0) {
      itensDetalhe.push({ label: 'Rodizio', valor: formatCurrency(rodizioPrice) })
    }

    personItems.forEach((item) => {
      const totalItem = Number(item.unit_price || 0) * Number(item.quantity || 0)
      itemsTotal += totalItem
      itensDetalhe.push({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.unit_price,
        label: `${item.quantity}x ${item.name}`,
        valor: formatCurrency(totalItem),
        isEditable: true,
      })
    })

    if (!pessoa.is_birthday && birthdayShare > 0) {
      itensDetalhe.push({
        label: 'Valor do Aniversariante',
        valor: formatCurrency(birthdayShare),
        isShared: true,
      })
    }

    const baseTotal = itemsTotal + rodizioPrice
    const total = pessoa.is_birthday ? 0 : baseTotal + (birthdayShare || 0)

    return {
      id: pessoa.id,
      nome: pessoa.name,
      iniciais: getInitials(pessoa.name),
      total: formatCurrency(total),
      baseTotal,
      status: pessoa.payment_status,
      isVoce: Number(localStorage.getItem(`selectedPerson:${eventoId}`)) === pessoa.id,
      isAniversariante: pessoa.is_birthday,
      itens: itensDetalhe,
    }
  })

  const totalMesa = pessoasResumo.reduce((sum, pessoa) => sum + pessoa.baseTotal, 0)

  const totalMesaParts = formatCurrencyParts(totalMesa)
  const totalPago = pessoasResumo.filter((pessoa) => pessoa.status === 'pago')
  const isFullyPaid = totalPago.length === pessoasResumo.length && pessoasResumo.length > 0
  const pagoLabel = isFullyPaid ? 'Totalmente Pago' : 'Ainda nao pago'

  if (loading) {
    return (
      <div className="loader-container">
        <LoaderCircle size={48} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="Sumario">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="Sumario">
      <div className={`SumarioTotal ${!isFullyPaid ? 'pending' : ''}`}>
        <h4>Total da Mesa</h4>
        <span className="SumarioTotalValorContainer">
          <div className="SumarioTotalSifra">R$</div>
          <div className="SumarioTotalValor">{totalMesaParts.intPart}</div>
          <div className="SumarioTotalCentavos">,{totalMesaParts.decimalPart}</div>
        </span>
        <span className={`SumarioTotalPago ${!isFullyPaid ? 'pending' : ''}`}>
          <div className="SumarioTotalPagoIcon">
            {isFullyPaid ? <Check size={16} /> : <Clock size={16} />}
          </div>
          <p>{pagoLabel}</p>
        </span>
      </div>
      <div className="SumarioHeader">
        <h1>Lista Geral</h1>
      </div>
      <div className="SumarioLista">
        {pessoasResumo.map((pessoa) => (
          <SumarioItem
            key={pessoa.id}
            nome={pessoa.nome}
            iniciais={pessoa.iniciais}
            total={pessoa.total}
            status={pessoa.status}
            itens={pessoa.itens}
            isVoce={pessoa.isVoce}
            isAniversariante={pessoa.isAniversariante}
            onUpdated={() => loadDados(eventoId)}
          />
        ))}
      </div>
    </div>
  )
}

export default Sumario
