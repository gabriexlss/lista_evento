
import './Setup.css'
import { useCallback, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import EventosAPI from '../../../../api/eventos.api'
import PessoasAPI from '../../../../api/pessoas.api'
import { LoaderCircle } from 'lucide-react'
import { notify } from '../../../../utils/notify'

const formatToInputDateTime = (value) => {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  const pad = (number) => String(number).padStart(2, '0')
  const year = date.getFullYear()
  const month = pad(date.getMonth() + 1)
  const day = pad(date.getDate())
  const hours = pad(date.getHours())
  const minutes = pad(date.getMinutes())
  return `${year}-${month}-${day}T${hours}:${minutes}`
}

const Setup = () => {
  const { eventoId } = useParams()
  const navigate = useNavigate()
  const [evento, setEvento] = useState(null)
  const [name, setName] = useState('')
  const [startsAt, setStartsAt] = useState('')
  const [location, setLocation] = useState('')
  const [rodizioPrice, setRodizioPrice] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadEvento = useCallback(async (currentEventId) => {
    setLoading(true)
    try {
      const data = await EventosAPI.getEvento(currentEventId)
      setEvento(data)
      setName(data.name || '')
      setStartsAt(formatToInputDateTime(data.starts_at))
      setLocation(data.location || '')
      setRodizioPrice(Number(data.rodizio_price || 0))
      setError('')
    } catch (error) {
      console.error('Erro ao buscar evento:', error)
      setError('Algo deu errado ao carregar o evento.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!eventoId) return
    const timeoutId = setTimeout(() => loadEvento(eventoId), 0)
    return () => clearTimeout(timeoutId)
  }, [eventoId, loadEvento])

  if (!eventoId) {
    return (
      <div className="Setup">
        <p>Evento nao encontrado.</p>
      </div>
    )
  }

  const handleCancel = () => {
    if (!evento) return
    setName(evento.name || '')
    setStartsAt(formatToInputDateTime(evento.starts_at))
    setLocation(evento.location || '')
    setRodizioPrice(Number(evento.rodizio_price || 0))
  }

  const handleSave = async () => {
    try {
      const payload = {
        name,
        starts_at: startsAt ? new Date(startsAt).toISOString() : '',
        location,
        rodizio_price: rodizioPrice,
      }
      const updated = await EventosAPI.updateEvento(eventoId, payload)
      setEvento(updated)
      notify.success('Evento atualizado')
    } catch (error) {
      notify.error('Erro ao atualizar evento')
      console.error('Erro ao atualizar evento:', error)
    }
  }

  const handleDeleteEvento = async () => {
    if (!window.confirm('Tem certeza que deseja apagar permanentemente o evento?')) {
      return
    }
    if (!window.confirm('Isso irá apagar TODAS as pessoas e consumos deste evento. Confirma?')) {
      return
    }
    try {
      await EventosAPI.deleteEvento(eventoId)
      localStorage.removeItem(`selectedPerson:${eventoId}`)
      notify.success('Evento excluído com sucesso')
      navigate('/')
    } catch (error) {
      notify.error('Erro ao excluir evento')
      console.error('Erro ao excluir evento:', error)
    }
  }

  const handleDeletePerfil = async () => {
    const selectedPersonId = Number(localStorage.getItem(`selectedPerson:${eventoId}`))
    if (!selectedPersonId) {
      notify.error('Nenhum perfil selecionado')
      return
    }
    if (!window.confirm('Tem certeza que deseja apagar seu perfil atual deste evento?')) {
      return
    }
    if (!window.confirm('Isso irá apagar todos os seus consumos cadastrados. Confirma?')) {
      return
    }
    try {
      await PessoasAPI.deletePessoa(selectedPersonId)
      localStorage.removeItem(`selectedPerson:${eventoId}`)
      notify.success('Perfil excluído com sucesso')
      navigate(`/pessoa/${eventoId}`)
    } catch (error) {
      notify.error('Erro ao excluir perfil')
      console.error('Erro ao excluir perfil:', error)
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
      <div className="Setup">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="Setup">
      <header className="SetupHeader">
        <h1>Setup</h1>
        <p>Configure valores e detalhes do evento.</p>
      </header>

      <section className="SetupCard">
        <h2>Evento</h2>
        <div className="SetupGrid">
          <label className="SetupField">
            <span>Nome do evento</span>
            <input
              className="SetupInput"
              name="nome"
              type="text"
              placeholder="Ex: Aniversario Vinicius"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <label className="SetupField">
            <span>Data e hora</span>
            <input
              className="SetupInput"
              name="data"
              type="datetime-local"
              value={startsAt}
              onChange={(event) => setStartsAt(event.target.value)}
            />
          </label>
          <label className="SetupField">
            <span>Local</span>
            <input
              className="SetupInput"
              name="local"
              type="text"
              placeholder="Ex: Habibs"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />
          </label>
        </div>
      </section>

      <section className="SetupCard">
        <h2>Valores</h2>
        <div className="SetupGrid">
          <label className="SetupField">
            <span>Valor do rodizio</span>
            <input
              className="SetupInput"
              name="rodizio"
              type="number"
              min="0"
              step="0.01"
              placeholder="R$ 0,00"
              value={rodizioPrice}
              onChange={(event) => setRodizioPrice(Number(event.target.value))}
            />
          </label>
        </div>
      </section>

      <section className="SetupCard SetupCardDestructive">
        <h2>Zona de Perigo</h2>
        <p className="SetupDestructiveWarning">Estas ações são permanentes e não podem ser desfeitas.</p>
        <div className="SetupDestructiveButtons">
          <button type="button" className="SetupButton SetupButtonDestructive" onClick={handleDeletePerfil}>
            Apagar Perfil Atual
          </button>
          <button type="button" className="SetupButton SetupButtonDestructive" onClick={handleDeleteEvento}>
            Apagar Evento
          </button>
        </div>
      </section>

      <div className="SetupActions">
        <button type="button" className="SetupButton SetupButtonGhost" onClick={handleCancel}>
          Cancelar
        </button>
        <button type="button" className="SetupButton" onClick={handleSave}>
          Salvar configuracoes
        </button>
      </div>
    </div>
  )
}

export default Setup
