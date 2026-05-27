import { Calendar, MapPin } from 'lucide-react'
import './CardEventos.css'
import { useNavigate } from 'react-router-dom'

const CardEventos = () => {
  const navigate = useNavigate()

  return (
    <div className="CardEventos" onClick={() => navigate('/pessoa')}>
        <h2 className="CardEventosTitle">Aniversario Carlos Vinicius</h2>
      <div className="CardEventosInfo">
        <div className="CardEventosData">
          <Calendar size={20} />
          <p>Hoje, 18:00</p>
        </div>
        <div className="CardEventosLocal">
          <MapPin size={20} />
          <p>Bar do seu Zé</p>
        </div>
      </div>
    </div>
  )
}

export default CardEventos