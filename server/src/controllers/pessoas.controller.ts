import { Request, Response } from 'express';
import { pool } from '../db';
import { newPersonSchema, updatePersonSchema } from '../models';

const CreatePerson = async (req: Request, res: Response) => {
  const dados = newPersonSchema.safeParse(req.body);
  if (!dados.success) return res.status(400).json({ message: 'Dados Invalidos' });

  const { event_id, name, is_birthday, payment_status } = dados.data;

  try {
    const result = await pool.query(
      'INSERT INTO people (event_id, name, is_birthday, payment_status) VALUES ($1, $2, $3, $4) RETURNING *',
      [event_id, name, is_birthday, payment_status],
    );
    res.status(201).json(result.rows[0]);
  } catch {
    res.status(500).json({ message: 'Erro ao criar pessoa' });
  }
};

const GetPeopleByEvent = async (req: Request, res: Response) => {
  const eventId = Number(req.params.eventId);
  if (!Number.isInteger(eventId)) {
    return res.status(400).json({ message: 'Evento invalido' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM people WHERE event_id = $1 ORDER BY created_at ASC',
      [eventId],
    );
    res.json(result.rows);
  } catch {
    res.status(500).json({ message: 'Erro ao buscar pessoas' });
  }
};

const UpdatePerson = async (req: Request, res: Response) => {
  const personId = Number(req.params.id);
  if (!Number.isInteger(personId)) {
    return res.status(400).json({ message: 'Pessoa invalida' });
  }

  const dados = updatePersonSchema.safeParse(req.body);
  if (!dados.success) return res.status(400).json({ message: 'Dados Invalidos' });

  const entries = Object.entries(dados.data);
  if (entries.length === 0) {
    return res.status(400).json({ message: 'Nenhum campo para atualizar' });
  }

  const setClauses = entries.map(([key], index) => `${key} = $${index + 1}`);
  const values: Array<string | boolean | number> = entries.map(([, value]) => value);
  values.push(personId);

  try {
    const result = await pool.query(
      `UPDATE people SET ${setClauses.join(', ')} WHERE id = $${values.length} RETURNING *`,
      values,
    );
    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ message: 'Erro ao atualizar pessoa' });
  }
};

const DeletePerson = async (req: Request, res: Response) => {
  const personId = Number(req.params.id);
  if (!Number.isInteger(personId)) {
    return res.status(400).json({ message: 'Pessoa invalida' });
  }

  try {
    await pool.query('DELETE FROM consumption_items WHERE person_id = $1', [personId]);
    await pool.query('DELETE FROM people WHERE id = $1', [personId]);
    res.json({ message: 'Pessoa deletada com sucesso' });
  } catch {
    res.status(500).json({ message: 'Erro ao deletar pessoa' });
  }
};

export { CreatePerson, GetPeopleByEvent, UpdatePerson, DeletePerson };
