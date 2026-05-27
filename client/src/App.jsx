import './App.css'
import { Route, Routes } from 'react-router-dom'

// Paginas
import Inicio from './pages/Inicio'
import Pessoa from './pages/Pessoa'
import Principal from './pages/Principal'

// Componentes
function App() {
  return (
    <main className="app">
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/pessoa" element={<Pessoa />} />
        <Route path="/app/*" element={<Principal />} />
        <Route path="*" element={<Inicio />} />
      </Routes>
    </main>
  )
}

export default App
