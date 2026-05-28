const SERVER_URL = import.meta.env.VITE_SERVER_URL

const ItensAPI = {
  createItem: async (itemData) => {
    const response = await fetch(`${SERVER_URL}/items/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itemData),
    })
    if (!response.ok) throw new Error('Erro ao criar item')
    return response.json()
  },
  getItensByEvento: async (eventoId) => {
    const response = await fetch(`${SERVER_URL}/items/get/${eventoId}`)
    if (!response.ok) throw new Error('Erro ao buscar itens')
    return response.json()
  },
  updateItem: async (itemId, itemData) => {
    const response = await fetch(`${SERVER_URL}/items/update/${itemId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itemData),
    })
    if (!response.ok) throw new Error('Erro ao atualizar item')
    return response.json()
  },
  deleteItem: async (itemId) => {
    const response = await fetch(`${SERVER_URL}/items/delete/${itemId}`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error('Erro ao deletar item')
    return response.json()
  },
}

export default ItensAPI
