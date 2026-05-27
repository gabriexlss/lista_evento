import { Routes, Route } from 'react-router-dom'
import './Principal.css'

// Sub paginas
import Setup from './pages/Setup'
import Consumo from './pages/Consumo'
import Sumario from './pages/Sumario'

// Componentes
import Header from './components/Header'
import ActionsBar from './components/ActionsBar'
const Principal = () => {
  return (
    
    <main className="Principal">
      <Header />
      <Routes>
        <Route path="/setup" element={<Setup />} />
        <Route path="/consumo" element={<Consumo />} />
        <Route path="/sumario" element={<Sumario />} />
        <Route path="*" element={<Consumo />} />
      </Routes>
      <ActionsBar />
    </main>
  )
}

export default Principal