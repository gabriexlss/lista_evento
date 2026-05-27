import * as Dialog from '@radix-ui/react-dialog'
import './addConsumo.css'

const AddConsumo = ({ children }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="AddConsumoOverlay" />
        <Dialog.Content className="AddConsumoContent">
          <div className="AddConsumoHeader">
            <Dialog.Title className="AddConsumoTitle">Novo consumo</Dialog.Title>
            <Dialog.Close asChild>
              <button className="AddConsumoClose" type="button">
                X
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Description className="AddConsumoDescription">
            Preencha os dados abaixo.
          </Dialog.Description>

          <form className="AddConsumoForm" onSubmit={(event) => event.preventDefault()}>
            <label className="AddConsumoField">
              <span>Nome</span>
              <input className="AddConsumoInput" name="nome" type="text" />
            </label>
            <label className="AddConsumoField">
              <span>Quantidade</span>
              <input className="AddConsumoInput" name="quantidade" type="number" min="1" />
            </label>
            <label className="AddConsumoField">
              <span>Preco</span>
              <input className="AddConsumoInput" name="preco" type="number" min="0" step="0.01" />
            </label>
            <div className="AddConsumoActions">
              <Dialog.Close asChild>
                <button className="AddConsumoButton AddConsumoButtonGhost" type="button">
                  Cancelar
                </button>
              </Dialog.Close>
              <button className="AddConsumoButton" type="submit">
                Salvar
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default AddConsumo
