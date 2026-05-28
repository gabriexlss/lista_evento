import { Router } from 'express'
export const eventosRouter = Router()
import { GetEvents, CreateEvent } from '../controllers/eventos.controller'

eventosRouter.get('/get', GetEvents)
eventosRouter.post('/create', CreateEvent)
