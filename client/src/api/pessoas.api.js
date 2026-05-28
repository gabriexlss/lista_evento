const SERVER_URL = import.meta.env.VITE_SERVER_URL

const PessoasAPI = {
  createPessoa: async (pessoaData) => {
    const response = await fetch(`${SERVER_URL}/people/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pessoaData),
    })
    if (!response.ok) throw new Error('Erro ao criar pessoa')
    return response.json()
  },
  getPessoasByEvento: async (eventoId) => {
    const response = await fetch(`${SERVER_URL}/people/get/${eventoId}`)
    if (!response.ok) throw new Error('Erro ao buscar pessoas')
    return response.json()
  },
  updatePessoa: async (pessoaId, pessoaData) => {
    const response = await fetch(`${SERVER_URL}/people/update/${pessoaId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pessoaData),
    })
    if (!response.ok) throw new Error('Erro ao atualizar pessoa')
    return response.json()
  },
  deletePessoa: async (pessoaId) => {
    const response = await fetch(`${SERVER_URL}/people/delete/${pessoaId}`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error('Erro ao deletar pessoa')
    return response.json()
  },
}

export default PessoasAPI
