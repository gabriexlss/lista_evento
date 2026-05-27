import './Pessoa.css'
import CardPessoa from '../../components/CardPessoa'
import { UserPlus } from 'lucide-react'
import AddPessoa from '../../components/AddPessoa'
const Pessoa = () => {
  return (
    <main className="Pessoa">
      <header className="PessoaHeader">
        <h1 className="PessoaTitle">Quem é você?</h1>
      </header>
      <h4 className="PessoaSubTitle">Escolha uma das opções abaixo para continuar</h4>
      <div className="PessoaGrid">
        <CardPessoa />
        <CardPessoa />
        <CardPessoa />
        <CardPessoa />
      </div>
      <footer className="PessoaFooter">
        <AddPessoa>
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