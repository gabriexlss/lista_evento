import * as Dialog from '@radix-ui/react-dialog'
import './editConsumo.css'
import { useState } from 'react'
import ItensAPI from '../../api/itens.api'
import { notify } from '../../utils/notify'

const EditConsumo = ({ children, item, onUpdated }) => {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(item.name || '')
  const [quantity, setQuantity] = useState(item.quantity || 1)
  const [price, setPrice] = useState(item.unitPrice || '')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await ItensAPI.updateItem(item.id, {
        name,
        quantity,
        unit_price: Number(price),
      })
      notify.success('Consumo atualizado')
      setOpen(false)
      if (onUpdated) onUpdated()
    } catch (error) {
      notify.error('Erro ao atualizar consumo')
      console.error('Erro ao atualizar consumo:', error)
      setOpen(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm(`Tem certeza que deseja excluir "${item.name}"?`)) {
      return
    }
    try {
      await ItensAPI.deleteItem(item.id)
      notify.success('Consumo excluído')
      setOpen(false)
      if (onUpdated) onUpdated()
    } catch (error) {
      notify.error('Erro ao excluir consumo')
      console.error('Erro ao excluir consumo:', error)
      setOpen(false)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="EditConsumoOverlay" />
        <Dialog.Content className="EditConsumoContent">
          <div className="EditConsumoHeader">
            <Dialog.Title className="EditConsumoTitle">Editar consumo</Dialog.Title>
            <Dialog.Close asChild>
              <button className="EditConsumoClose" type="button">
                X
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Description className="EditConsumoDescription">
            Altere os dados ou exclua o item abaixo.
          </Dialog.Description>

          <form className="EditConsumoForm" onSubmit={handleSubmit}>
            <label className="EditConsumoField">
              <span>Nome</span>
              <input
                className="EditConsumoInput"
                name="nome"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </label>
            <label className="EditConsumoField">
              <span>Quantidade</span>
              <input
                className="EditConsumoInput"
                name="quantidade"
                type="number"
                min="1"
                value={quantity}
                onChange={(event) => setQuantity(Number(event.target.value))}
                required
              />
            </label>
            <label className="EditConsumoField">
              <span>Preço</span>
              <input
                className="EditConsumoInput"
                name="preco"
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                required
              />
            </label>
            <div className="EditConsumoActions">
              <button 
                className="EditConsumoButton EditConsumoButtonDelete" 
                type="button"
                onClick={handleDelete}
              >
                Excluir
              </button>
              <Dialog.Close asChild>
                <button className="EditConsumoButton EditConsumoButtonGhost" type="button">
                  Cancelar
                </button>
              </Dialog.Close>
              <button className="EditConsumoButton" type="submit">
                Salvar
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default EditConsumo
