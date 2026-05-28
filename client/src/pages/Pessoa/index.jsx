import './Pessoa.css'
import CardPessoa from '../../components/CardPessoa'
import { LoaderCircle, UserPlus, Users, ArrowLeft } from 'lucide-react'
import AddPessoa from '../../components/AddPessoa'
import { useCallback, useEffect, useState } from 'react'
import PessoasAPI from '../../api/pessoas.api'
import { useParams, useNavigate } from 'react-router-dom'

const Pessoa = () => {
  const { eventoId } = useParams()
  const navigate = useNavigate()
  const [pessoas, setPessoas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchPessoas = useCallback(async (currentEventId) => {
    setLoading(true)
    try {
      const data = await PessoasAPI.getPessoasByEvento(currentEventId)
      setPessoas(data)
      setError('')
    } catch (error) {
      console.error('Erro ao buscar pessoas:', error)
      setError('Algo deu errado ao carregar pessoas.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!eventoId) return
    const timeoutId = setTimeout(() => fetchPessoas(eventoId), 0)
    return () => clearTimeout(timeoutId)
  }, [eventoId, fetchPessoas])

  if (!eventoId) {
    return (
      <main className="Pessoa">
        <p>Evento nao encontrado.</p>
      </main>
    )
  }

  const handlePessoaCriada = (pessoa) => {
    setPessoas((prev) => [...prev, pessoa])
    localStorage.setItem(`selectedPerson:${eventoId}`, pessoa.id)
  }

  const handleSelect = (pessoa) => {
    localStorage.setItem(`selectedPerson:${eventoId}`, pessoa.id)
  }

  if (loading) {
    return (
      <div className="loader-container">
        <LoaderCircle size={48} />
      </div>
    )
  }

  if (error) {
    return (
      <main className="Pessoa">
        <p>{error}</p>
      </main>
    )
  }

  return (
    <main className="Pessoa">
      <header className="PessoaHeader">
        <button className="PessoaBackButton" onClick={() => navigate('/')} aria-label="Voltar">
          <ArrowLeft size={20} />
        </button>
        <h1 className="PessoaTitle">Quem é você?</h1>
        <div className="PessoaHeaderSpacer"></div>
      </header>
      <h4 className="PessoaSubTitle">Escolha uma das opções abaixo para continuar</h4>
      {pessoas.length === 0 ? (
        <div className="PessoaEmptyState">
          <Users size={48} className="PessoaEmptyIcon" />
          <p className="PessoaEmptyText">Nenhuma pessoa cadastrada ainda.</p>
          <span className="PessoaEmptySubText">Adicione pessoas abaixo para começar a dividir a conta!</span>
        </div>
      ) : (
        <div className="PessoaGrid">
          {pessoas.map((pessoa) => (
            <CardPessoa
              key={pessoa.id}
              person={pessoa}
              eventoId={eventoId}
              onSelect={handleSelect}
            />
          ))}
        </div>
      )}
      <footer className="PessoaFooter">
        <AddPessoa eventoId={eventoId} onCreated={handlePessoaCriada}>
          <button type="button">
            <UserPlus size={20} />
            <p>Participar do Evento</p>
          </button>
        </AddPessoa>
      </footer>
    </main>
  )
}

export default Pessoa
