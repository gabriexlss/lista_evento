import * as Dialog from '@radix-ui/react-dialog'
import './addPessoa.css'
import { useState } from 'react'
import PessoasAPI from '../../api/pessoas.api'
import { notify } from '../../utils/notify'

const AddPessoa = ({ children, eventoId, onCreated }) => {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [isBirthday, setIsBirthday] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const pessoa = await PessoasAPI.createPessoa({
        event_id: eventoId,
        name,
        is_birthday: isBirthday,
      })
      notify.success('Pessoa adicionada')
      setOpen(false)
      setName('')
      setIsBirthday(false)
      if (onCreated) onCreated(pessoa)
    } catch (error) {
      notify.error('Erro ao criar pessoa')
      console.error('Erro ao criar pessoa:', error)
      setOpen(false)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
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

          <form className="AddPessoaForm" onSubmit={handleSubmit}>
            <label className="AddPessoaField">
              <span>Nome</span>
              <input
                className="AddPessoaInput"
                name="nome"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>
            <label className="AddPessoaCheckbox">
              <input
                name="aniversariante"
                type="checkbox"
                checked={isBirthday}
                onChange={(event) => setIsBirthday(event.target.checked)}
              />
              <span>Sou aniversariante</span>
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
