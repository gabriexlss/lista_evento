import * as Dialog from '@radix-ui/react-dialog'
import './addPessoa.css'

const AddPessoa = ({ children }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="AddPessoaOverlay" />
        <Dialog.Content className="AddPessoaContent">
          <div className="AddPessoaHeader">
            <Dialog.Title className="AddPessoaTitle">Nova pessoa</Dialog.Title>
            <Dialog.Close asChild>
              <button className="AddPessoaClose" type="button">
                X
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Description className="AddPessoaDescription">
            Digite seu nome para participar do evento.
          </Dialog.Description>

          <form className="AddPessoaForm" onSubmit={(event) => event.preventDefault()}>
            <label className="AddPessoaField">
              <span>Nome</span>
              <input className="AddPessoaInput" name="nome" type="text" />
            </label>
            <div className="AddPessoaActions">
              <Dialog.Close asChild>
                <button className="AddPessoaButton AddPessoaButtonGhost" type="button">
                  Cancelar
                </button>
              </Dialog.Close>
              <button className="AddPessoaButton" type="submit">
                Salvar
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default AddPessoa
