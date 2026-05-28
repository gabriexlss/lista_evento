import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { toastConfig } from './utils/notify'

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
        <Route path="/pessoa/:eventoId" element={<Pessoa />} />
        <Route path="/app/:eventoId/*" element={<Principal />} />
        <Route path="*" element={<Inicio />} />
      </Routes>
      <ToastContainer {...toastConfig} />
    </main>
  )
}

export default App
