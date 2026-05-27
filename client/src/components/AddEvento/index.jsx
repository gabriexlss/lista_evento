import * as Dialog from '@radix-ui/react-dialog'
import './addEvento.css'

const AddEvento = ({ children }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="AddEventoOverlay" />
        <Dialog.Content className="AddEventoContent">
          <div className="AddEventoHeader">
            <Dialog.Title className="AddEventoTitle">Novo evento</Dialog.Title>
            <Dialog.Close asChild>
              <button className="AddEventoClose" type="button">
                X
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Description className="AddEventoDescription">
            Preencha os dados abaixo.
          </Dialog.Description>

          <form className="AddEventoForm" onSubmit={(event) => event.preventDefault()}>
            <label className="AddEventoField">
              <span>Nome</span>
              <input className="AddEventoInput" name="nome" type="text" />
            </label>
            <label className="AddEventoField">
              <span>Data</span>
              <input className="AddEventoInput" name="data" type="date" />
            </label>
            <label className="AddEventoField">
              <span>Local</span>
              <input className="AddEventoInput" name="local" type="text" />
            </label>
            <label className="AddEventoCheckbox">
              <input name="aniversario" type="checkbox" />
              <span>Eh aniversario?</span>
            </label>
            <div className="AddEventoActions">
              <Dialog.Close asChild>
                <button className="AddEventoButton AddEventoButtonGhost" type="button">
                  Cancelar
                </button>
              </Dialog.Close>
              <button className="AddEventoButton" type="submit">
                Salvar
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default AddEvento