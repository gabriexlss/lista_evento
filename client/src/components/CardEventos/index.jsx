import { Calendar, MapPin } from 'lucide-react'
import './CardEventos.css'
import { useNavigate } from 'react-router-dom'

const formatDateTime = (value) => {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)

  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = String(date.getFullYear())

  return `${hours}:${minutes} do dia ${day}/${month}/${year}`
}

const CardEventos = ({ id, name, starts_at, location }) => {
  const navigate = useNavigate()

  return (
    <div className="CardEventos" onClick={() => navigate(`/pessoa/${id}`)}>
        <h2 className="CardEventosTitle">{name}</h2>
      <div className="CardEventosInfo">
        <div className="CardEventosData">
          <Calendar size={20} />
          <p>{formatDateTime(starts_at)}</p>
        </div>
        <div className="CardEventosLocal">
          <MapPin size={20} />
          <p>{location}</p>
        </div>
      </div>
    </div>
  )
}

export default CardEventos