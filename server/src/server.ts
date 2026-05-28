import express from 'express';
import cors from 'cors';
import 'dotenv/config';

// Importar rotas
import { eventosRouter } from './routes/eventos.route';
import { pessoasRouter }  from './routes/pessoas.route';
import { itensRouter } from './routes/itens.routes';

const app = express();

const rawCorsOrigins = process.env.CORS_ORIGIN || 'http://localhost:5173';
const allowedOrigins = rawCorsOrigins
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error(`Not allowed by CORS: ${origin}`));
    },
  }),
);
app.use(express.json());

const port = process.env.PORT || 3000;

// Rotas
app.use('/events', eventosRouter);
app.use('/people', pessoasRouter);
app.use('/items', itensRouter);

app.listen(port, () => {
  console.info(`Servidor ativo em http://localhost:${port}`);
});
