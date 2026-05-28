import { CreateEvent, GetEventById, GetEvents, UpdateEvent, DeleteEvent } from '../controllers/eventos.controller';
import { Router } from 'express';

export const eventosRouter = Router();

eventosRouter.get('/get', GetEvents);
eventosRouter.get('/get/:eventId', GetEventById);
eventosRouter.post('/create', CreateEvent);
eventosRouter.put('/update/:eventId', UpdateEvent);
eventosRouter.delete('/delete/:eventId', DeleteEvent);
