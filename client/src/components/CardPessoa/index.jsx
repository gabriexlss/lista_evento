import './CardPessoa.css'
import { useNavigate } from 'react-router-dom'

const CardPessoa = () => {
    const navigate = useNavigate()
  return (
    <div className="CardPessoa" onClick={() => navigate('/app')}>
      <div className="CardPessoaFoto">
        <p>C</p>
      </div>
      <h2 className="CardPessoaNome">Carlos Vinicius</h2>
    </div>
  )
}

export default CardPessoa