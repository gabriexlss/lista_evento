import './inicio.css'
import CardEventos from '../../components/CardEventos'
import { LoaderCircle, Plus } from 'lucide-react'
import AddEvento from '../../components/AddEvento'
import { useEffect, useState } from 'react'
import EventosAPI from '../../api/eventos.api'
const Inicio = () => {
  const [eventos, setEventos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => {
    let isMounted = true
    const retryDelays = [0, 3000, 10000, 30000]
    const timeouts = []

    const fetchEventos = async (attempt) => {
      try {
        const data = await EventosAPI.getEventos()
        if (!isMounted) return
        setEventos(data)
        setError('')
        setLoading(false)
      } catch (error) {
        console.error('Erro ao buscar eventos:', error)
        if (!isMounted) return
        if (attempt < retryDelays.length - 1) {
          const nextDelay = retryDelays[attempt + 1]
          const timeoutId = setTimeout(() => fetchEventos(attempt + 1), nextDelay)
          timeouts.push(timeoutId)
          return
        }
        setError('Algo deu errado ao carregar eventos.')
        setLoading(false)
      }
    }

    fetchEventos(0)

    return () => {
      isMounted = false
      timeouts.forEach((timeoutId) => clearTimeout(timeoutId))
    }
  }, [])
  if (loading) {
    return (
      <div className="loader-container">
        <LoaderCircle size={48} />
      </div>
    )
  }

  if (error) {
    return (
      <main className="Inicio">
        <p>{error}</p>
      </main>
    )
  }

  return (
    <main className="Inicio">
    <header className="InicioHeader">
      <h1 className="InicioTitle">Bem vindo!</h1>
    </header>
    {eventos.map((evento) => (
      <CardEventos
        key={evento.id}
        id={evento.id}
        name={evento.name}
        starts_at={evento.starts_at}
        location={evento.location}
      />
    ))}
    <AddEvento>
      <button className="InicioAddEventos" type="button">
        <Plus />
      </button>
    </AddEvento>
  </main>
  )
}

export default Inicio