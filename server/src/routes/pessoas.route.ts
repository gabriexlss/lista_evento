import { Router } from 'express'
export const pessoasRouter = Router()

pessoasRouter.get('/', (req, res) => {
  res.json({ message: 'Rota de pessoas' })
})