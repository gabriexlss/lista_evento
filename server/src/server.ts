import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor Express + TypeScript rodando!' });
});

app.listen(port, () => {
  console.info(`Servidor ativo em http://localhost:${port}`);
});
