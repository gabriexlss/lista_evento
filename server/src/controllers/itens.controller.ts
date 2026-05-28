import { Request, Response } from 'express';
import { pool } from '../db';
import { newConsumptionItemSchema, updateConsumptionItemSchema } from '../models';

const CreateItem = async (req: Request, res: Response) => {
  const dados = newConsumptionItemSchema.safeParse(req.body);
  if (!dados.success) return res.status(400).json({ message: 'Dados Invalidos' });

  const { event_id, person_id, name, quantity, unit_price } = dados.data;

  try {
    const result = await pool.query(
      'INSERT INTO consumption_items (event_id, person_id, name, quantity, unit_price) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [event_id, person_id, name, quantity, unit_price],
    );
    res.status(201).json(result.rows[0]);
  } catch {
    res.status(500).json({ message: 'Erro ao criar consumo' });
  }
};

const GetItemsByEvent = async (req: Request, res: Response) => {
  const eventId = Number(req.params.eventId);
  if (!Number.isInteger(eventId)) {
    return res.status(400).json({ message: 'Evento invalido' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM consumption_items WHERE event_id = $1 ORDER BY created_at ASC',
      [eventId],
    );
    res.json(result.rows);
  } catch {
    res.status(500).json({ message: 'Erro ao buscar consumos' });
  }
};

const UpdateItem = async (req: Request, res: Response) => {
  const itemId = Number(req.params.id);
  if (!Number.isInteger(itemId)) {
    return res.status(400).json({ message: 'Consumo invalido' });
  }

  const dados = updateConsumptionItemSchema.safeParse(req.body);
  if (!dados.success) return res.status(400).json({ message: 'Dados Invalidos' });

  const entries = Object.entries(dados.data);
  if (entries.length === 0) {
    return res.status(400).json({ message: 'Nenhum campo para atualizar' });
  }

  const setClauses = entries.map(([key], index) => `${key} = $${index + 1}`);
  const values = entries.map(([, value]) => value);
  values.push(itemId);

  try {
    const result = await pool.query(
      `UPDATE consumption_items SET ${setClauses.join(', ')} WHERE id = $${values.length} RETURNING *`,
      values,
    );
    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ message: 'Erro ao atualizar consumo' });
  }
};

const DeleteItem = async (req: Request, res: Response) => {
  const itemId = Number(req.params.id);
  if (!Number.isInteger(itemId)) {
    return res.status(400).json({ message: 'Consumo invalido' });
  }

  try {
    await pool.query('DELETE FROM consumption_items WHERE id = $1', [itemId]);
    res.json({ message: 'Consumo deletado com sucesso' });
  } catch {
    res.status(500).json({ message: 'Erro ao deletar consumo' });
  }
};

export { CreateItem, GetItemsByEvent, UpdateItem, DeleteItem };
