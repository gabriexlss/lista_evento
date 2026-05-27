import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import './Header.css'

const Header = () => {
  const { pathname } = useLocation()
  const title = useMemo(() => {
    switch (pathname) {
      case '/app/setup':
        return 'Configurações'
      case '/app/consumo':
        return 'Consumo'
      case '/app/sumario':
        return 'Sumário'
      default:
        return 'Consumo'
    }
  }, [pathname])
  return (
    <header className="PrincipalHeader">
      <h1 className="PrincipalTitle">{title}</h1>
    </header>
  )
}

export default Header