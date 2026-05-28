import './CardPessoa.css'
import { useNavigate } from 'react-router-dom'

const getInitials = (name) => {
  if (!name) return ''
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
}

const CardPessoa = ({ person, eventoId, onSelect }) => {
  const navigate = useNavigate()
  const initials = getInitials(person.name)

  const handleClick = () => {
    if (onSelect) {
      onSelect(person)
    }
    navigate(`/app/${eventoId}/consumo`)
  }

  return (
    <div className="CardPessoa" onClick={handleClick}>
      <div className="CardPessoaFoto">
        <p>{initials}</p>
      </div>
      <h2 className="CardPessoaNome">{person.name}</h2>
    </div>
  )
}

export default CardPessoa
