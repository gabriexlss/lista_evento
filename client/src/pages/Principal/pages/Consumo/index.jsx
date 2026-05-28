import { Calendar, MapPin, Cake, Users, Plus, LoaderCircle } from 'lucide-react'
import ParticipanteCard from '../../../../components/ParticipanteCard'
import AddConsumo from '../../../../components/AddConsumo'
import './Consumo.css'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import EventosAPI from '../../../../api/eventos.api'
import PessoasAPI from '../../../../api/pessoas.api'
import ItensAPI from '../../../../api/itens.api'
import { notify } from '../../../../utils/notify'

const formatCurrencyParts = (value) => {
  const formatted = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value) || 0)
  const [intPart, decimalPart = '00'] = formatted.split(',')
  return { intPart, decimalPart }
}

const formatTime = (value) => {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}h`
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

const Consumo = () => {
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
      setError('Algo deu errado ao carregar o evento.')
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
      <div className="Consumo">
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

  const totalsByPerson = pessoas.map((pessoa) => {
    const personItems = itemsByPerson.get(pessoa.id) || []
    const itemsTotal = personItems.reduce(
      (sum, item) => sum + Number(item.unit_price || 0) * Number(item.quantity || 0),
      0,
    )
    const baseTotal = itemsTotal + rodizioPrice
    const total = pessoa.is_birthday ? 0 : baseTotal + (birthdayShare || 0)
    return {
      ...pessoa,
      itemsTotal,
      baseTotal,
      total,
      itemsCount: personItems.length + (rodizioPrice > 0 ? 1 : 0),
      sharedCount: pessoa.is_birthday ? 0 : birthdayShare > 0 ? 1 : 0,
    }
  })

  const totalMesa = totalsByPerson.reduce(
    (sum, pessoa) => sum + pessoa.baseTotal,
    0,
  )
  const totalPago = totalsByPerson
    .filter((pessoa) => pessoa.payment_status === 'pago')
    .reduce((sum, pessoa) => sum + pessoa.total, 0)
  const pagoPercent = totalMesa > 0 ? Math.round((totalPago / totalMesa) * 100) : 0

  const selectedPersonId = Number(localStorage.getItem(`selectedPerson:${eventoId}`))
  const pessoaAtual =
    totalsByPerson.find((pessoa) => pessoa.id === selectedPersonId) || totalsByPerson[0]

  const totalMeuConsumo = pessoaAtual?.total ?? 0
  const meuConsumoParts = formatCurrencyParts(totalMeuConsumo)
  const totalMesaParts = formatCurrencyParts(totalMesa)
  const aniversariante = birthdayPeople[0]

  const handleConsumoCriado = (item) => {
    setItens((prev) => [...prev, item])
  }

  const handlePagamento = async () => {
    if (!pessoaAtual) return
    const novoStatus = pessoaAtual.payment_status === 'pago' ? 'pendente' : 'pago'
    try {
      const updated = await PessoasAPI.updatePessoa(pessoaAtual.id, { payment_status: novoStatus })
      setPessoas((prev) => prev.map((pessoa) => (pessoa.id === updated.id ? updated : pessoa)))
      notify.success(novoStatus === 'pago' ? 'Pagamento registrado' : 'Pagamento cancelado')
    } catch (error) {
      notify.error('Erro ao atualizar pagamento')
      console.error('Erro ao atualizar pagamento:', error)
    }
  }

  if (loading) {
    return (
      <div className="loader-container">
        <LoaderCircle size={48} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="Consumo">
        <p>{error}</p>
      </div>
    )
  }

  if (!evento) {
    return (
      <div className="Consumo">
        <p>Evento nao encontrado.</p>
      </div>
    )
  }

  return (
    <div className="Consumo">
      <h1 className="ConsumoTitle">{evento.name}</h1>

      <div className="ConsumoHorarioeLocal">
        <Calendar size={20} />
        <p>{formatTime(evento.starts_at)}</p>
        <p> - </p>
        <MapPin size={20} />
        <p>{evento.location}</p>
      </div>

      {aniversariante && (
        <div className="ConsumoAniversariante">
          <Cake size={16} />
          <p>Aniversariante do dia: {aniversariante.name}</p>
        </div>
      )}

      {pessoaAtual && (
        <div className="ConsumoMeuConsumo">
          <h4>Meu Consumo</h4>
          <span className="ConsumoMeuConsumoValor">
            <div className="ConsumoTotalSifra">R$</div>
            <div className="ConsumoTotalValor">{meuConsumoParts.intPart}</div>
            <div className="ConsumoTotalCentavos">,{meuConsumoParts.decimalPart}</div>
          </span>
          <div className="ConsumoMeuConsumoFooter">
            <p className="ConsumoMeuConsumoResumo">
              {pessoaAtual.itemsCount} itens • {pessoaAtual.sharedCount} compartilhado
            </p>
            <button 
              className={`ConsumoPagoButton ${pessoaAtual.payment_status === 'pago' ? 'undo' : ''}`} 
              type="button" 
              onClick={handlePagamento}
            >
              {pessoaAtual.payment_status === 'pago' ? 'Não paguei' : 'Ja paguei'}
            </button>
          </div>
        </div>
      )}

      <div className="ConsumoTotal">
        <h4>Total da Mesa</h4>
        <span className="ConsumoTotalValorContainer">
          <div className="ConsumoTotalSifra">R$</div>
          <div className="ConsumoTotalValor">{totalMesaParts.intPart}</div>
          <div className="ConsumoTotalCentavos">,{totalMesaParts.decimalPart}</div>
        </span>
        <span className="ConsumoTotalPorcentagem">
          <div className="ConsumoTotalPorcentagemInfo">
            <p>Pago</p>
            <p>{pagoPercent}%</p>
          </div>
          <div className="ConsumoTotalPorcentagemBarra">
            <div
              className="ConsumoTotalPorcentagemBarraPreenchida"
              style={{ width: `${pagoPercent}%` }}
            />
          </div>
        </span>
      </div>

      <div className="ConsumoPessoas">
        <span>
          <Users size={28} />
        </span>
        <p>{pessoas.length}</p>
        <p>Pessoas</p>
      </div>

      <div className="ConsumoParticipantes">
        <h2>Participantes</h2>
      </div>
      <div className="ConsumoParticipantesGrid">
        {totalsByPerson.map((participante) => (
          <ParticipanteCard
            key={participante.id}
            nome={participante.name}
            iniciais={getInitials(participante.name)}
            status={participante.payment_status}
            isVoce={pessoaAtual?.id === participante.id}
            isAniversariante={participante.is_birthday}
          />
        ))}
      </div>
      <div className="ConsumoLancar">
        <AddConsumo
          eventoId={eventoId}
          pessoaId={pessoaAtual?.id}
          onCreated={handleConsumoCriado}
        >
          <button>
            <div className="ConsumoLancarIcon">
              <Plus size={20} />
            </div>
            <p>Registrar Novo Consumo</p>
          </button>
        </AddConsumo>
      </div>
    </div>
  )
}

export default Consumo
