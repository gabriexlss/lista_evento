import * as Dialog from '@radix-ui/react-dialog'
import './addConsumo.css'
import { useState } from 'react'
import ItensAPI from '../../api/itens.api'
import { notify } from '../../utils/notify'

const AddConsumo = ({ children, eventoId, pessoaId, onCreated }) => {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [price, setPrice] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!pessoaId) {
      notify.error('Selecione uma pessoa para lancar o consumo')
      return
    }

    try {
      const item = await ItensAPI.createItem({
        event_id: eventoId,
        person_id: pessoaId,
        name,
        quantity,
        unit_price: price,
      })
      notify.success('Consumo adicionado')
      setOpen(false)
      setName('')
      setQuantity(1)
      setPrice('')
      if (onCreated) onCreated(item)
    } catch (error) {
      notify.error('Erro ao criar consumo')
      console.error('Erro ao criar consumo:', error)
      setOpen(false)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
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

          <form className="AddConsumoForm" onSubmit={handleSubmit}>
            <label className="AddConsumoField">
              <span>Nome</span>
              <input
                className="AddConsumoInput"
                name="nome"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>
            <label className="AddConsumoField">
              <span>Quantidade</span>
              <input
                className="AddConsumoInput"
                name="quantidade"
                type="number"
                min="1"
                value={quantity}
                onChange={(event) => setQuantity(Number(event.target.value))}
              />
            </label>
            <label className="AddConsumoField">
              <span>Preco</span>
              <input
                className="AddConsumoInput"
                name="preco"
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
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
