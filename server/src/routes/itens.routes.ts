import { CreateItem, GetItemsByEvent, UpdateItem, DeleteItem } from '../controllers/itens.controller';
import { Router } from 'express';

export const itensRouter = Router();

itensRouter.post('/create', CreateItem);
itensRouter.get('/get/:eventId', GetItemsByEvent);
itensRouter.put('/update/:id', UpdateItem);
itensRouter.delete('/delete/:id', DeleteItem);