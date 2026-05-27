import './ActionsBar.css'
import { ClipboardList, Settings, Wallet } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useMemo } from 'react'

const ActionsBar = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const pagina = useMemo(() => {
        switch (pathname) {
            case '/app/setup':
                return 'setup'
            case '/app/consumo':
                return 'consumo'
            case '/app/sumario':
                return 'sumario'
            default:
                return 'consumo'
        }
    }, [pathname])
  return (
    <footer className="ActionsBar">
      <div className="ActionsBarGroup">
        <button className={`ActionsBarButton ${pagina === 'setup' ? 'ActionsBarButtonActive' : ''}`} type="button" onClick={() => navigate('/app/setup')}>
          <Settings size={18} />
          Setup
        </button>
        <button className={`ActionsBarButton ${pagina === 'consumo' ? 'ActionsBarButtonActive' : ''}`} type="button" onClick={() => navigate('/app/consumo')}>
          <Wallet size={18} />
          Consumo
        </button>
        <button className={`ActionsBarButton ${pagina === 'sumario' ? 'ActionsBarButtonActive' : ''}`} type="button" onClick={() => navigate('/app/sumario')}>
          <ClipboardList size={18} />
          Sumário
        </button>
      </div>
    </footer>
  )
}

export default ActionsBar