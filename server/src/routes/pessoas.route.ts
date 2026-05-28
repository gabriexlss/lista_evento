import { CreatePerson, GetPeopleByEvent, UpdatePerson, DeletePerson } from '../controllers/pessoas.controller';
import { Router } from 'express';

export const pessoasRouter = Router();

pessoasRouter.post('/create', CreatePerson);
pessoasRouter.get('/get/:eventId', GetPeopleByEvent);
pessoasRouter.put('/update/:id', UpdatePerson);
pessoasRouter.delete('/delete/:id', DeletePerson);