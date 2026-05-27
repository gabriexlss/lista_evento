import './inicio.css'
import CardEventos from '../../components/CardEventos'
import { Plus } from 'lucide-react'
import AddEvento from '../../components/AddEvento'
const Inicio = () => {
  return (
    <main className="Inicio">
      <header className="InicioHeader">
        <h1 className="InicioTitle">Bem vindo!</h1>
      </header>
      <CardEventos />
      <AddEvento>
        <button className="InicioAddEventos" type="button">
          <Plus />
        </button>
      </AddEvento>
    </main>
  )
}

export default Inicio