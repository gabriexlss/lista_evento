import { useMemo } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import './Header.css'

const Header = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { eventoId } = useParams()

  const title = useMemo(() => {
    const page = pathname.split('/')[3]
    switch (page) {
      case 'setup':
        return 'Configurações'
      case 'consumo':
        return 'Consumo'
      case 'sumario':
        return 'Sumário'
      default:
        return 'Consumo'
    }
  }, [pathname])

  const handleBack = () => {
    if (eventoId) {
      navigate(`/pessoa/${eventoId}`)
    } else {
      navigate('/')
    }
  }

  return (
    <header className="PrincipalHeader">
      <button className="HeaderBackButton" onClick={handleBack} aria-label="Voltar">
        <ArrowLeft size={20} />
      </button>
      <h1 className="PrincipalTitle">{title}</h1>
      <div className="HeaderSpacer"></div>
    </header>
  )
}

export default Header
