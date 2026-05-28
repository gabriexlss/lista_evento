const SERVER_URL = import.meta.env.VITE_SERVER_URL

const EventosAPI = {
    createEvento: async (eventoData) => {
        const response = await fetch(`${SERVER_URL}/events/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventoData)
        })
        if (!response.ok) throw new Error('Erro ao criar evento')
        return response.json()
    },
    getEventos: async () => {
        const response = await fetch(`${SERVER_URL}/events/get`)
        if (!response.ok) throw new Error('Erro ao buscar eventos')
        return response.json()
    },
    getEvento: async (eventoId) => {
        const response = await fetch(`${SERVER_URL}/events/get/${eventoId}`)
        if (!response.ok) throw new Error('Erro ao buscar evento')
        return response.json()
    },
    updateEvento: async (eventoId, eventoData) => {
        const response = await fetch(`${SERVER_URL}/events/update/${eventoId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventoData)
        })
        if (!response.ok) throw new Error('Erro ao atualizar evento')
        return response.json()
    },
    deleteEvento: async (eventoId) => {
        const response = await fetch(`${SERVER_URL}/events/delete/${eventoId}`, {
            method: 'DELETE'
        })
        if (!response.ok) throw new Error('Erro ao deletar evento')
        return response.json()
    }
}
export default EventosAPI