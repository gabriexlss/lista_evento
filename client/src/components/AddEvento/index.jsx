import * as Dialog from '@radix-ui/react-dialog'
import './addEvento.css'
import { useState } from 'react'
import { notify }  from '../../utils/notify'
import EventosAPI from '../../api/eventos.api'

const AddEvento = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [starts_at, setStartsAt] = useState('')
  const [location, setLocation] = useState('')
  const [is_birthday, setIsBirthday] = useState(false)
  const [rodizio_price, setRodizioPrice] = useState(0)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const data = {
      name,
      starts_at: starts_at ? new Date(starts_at).toISOString() : '',
      location,
      is_birthday,
      rodizio_price
    }

    try {
      const result = await EventosAPI.createEvento(data)
      notify.success(result.message)
      console.log(result)
      setOpen(false)
    } catch (error) {
      notify.error('Erro ao criar evento')
      console.error('Erro ao criar evento:', error)
      setOpen(false)
    }
  }
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
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

          <form className="AddEventoForm" onSubmit={handleSubmit}>
            <label className="AddEventoField">
              <span>Nome</span>
              <input className="AddEventoInput" name="nome" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label className="AddEventoField">
              <span>Data e hora</span>
              <input className="AddEventoInput" name="data" type="datetime-local" value={starts_at} onChange={(e) => setStartsAt(e.target.value)} />
            </label>
            <label className="AddEventoField">
              <span>Local</span>
              <input className="AddEventoInput" name="local" type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
            </label>
            <label className="AddEventoField">
              <span>Valor do rodizio</span>
              <input className="AddEventoInput" name="rodizio" type="number" min="0" step="0.01" value={rodizio_price} onChange={(e) => setRodizioPrice(e.target.value)} />
            </label>
            <label className="AddEventoCheckbox">
              <input name="aniversario" type="checkbox" checked={is_birthday} onChange={(e) => setIsBirthday(e.target.checked)} />
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