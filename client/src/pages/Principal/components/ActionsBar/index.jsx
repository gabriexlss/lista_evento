import './ActionsBar.css'
import { ClipboardList, Settings, Wallet } from 'lucide-react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useMemo } from 'react'

const ActionsBar = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { eventoId } = useParams()

    const pagina = useMemo(() => {
        const page = pathname.split('/')[3]
        switch (page) {
            case 'setup':
                return 'setup'
            case 'consumo':
                return 'consumo'
            case 'sumario':
                return 'sumario'
            default:
                return 'consumo'
        }
    }, [pathname])
  return (
    <footer className="ActionsBar">
      <div className="ActionsBarGroup">
        <button className={`ActionsBarButton ${pagina === 'setup' ? 'ActionsBarButtonActive' : ''}`} type="button" onClick={() => navigate(`/app/${eventoId}/setup`)}>
          <Settings size={18} />
          Setup
        </button>
        <button className={`ActionsBarButton ${pagina === 'consumo' ? 'ActionsBarButtonActive' : ''}`} type="button" onClick={() => navigate(`/app/${eventoId}/consumo`)}>
          <Wallet size={18} />
          Consumo
        </button>
        <button className={`ActionsBarButton ${pagina === 'sumario' ? 'ActionsBarButtonActive' : ''}`} type="button" onClick={() => navigate(`/app/${eventoId}/sumario`)}>
          <ClipboardList size={18} />
          Sumário
        </button>
      </div>
    </footer>
  )
}

export default ActionsBar
