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
    }
}
export default EventosAPI