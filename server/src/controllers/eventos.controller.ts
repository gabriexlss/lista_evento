import { Request, Response } from 'express';
import { pool } from '../db';
import { newEventSchema, updateEventSchema } from '../models';

const CreateEvent = async (req: Request, res: Response) => {
    const dados = newEventSchema.safeParse(req.body);
    if (!dados.success) return res.status(400).json({ message: 'Dados Invalidos' });

    const { name, starts_at, is_birthday, rodizio_price, location } = dados.data;

    try {
        const result = await pool.query(
            'INSERT INTO events (name, starts_at, is_birthday, rodizio_price, location) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, starts_at, is_birthday, rodizio_price, location],
        );
        res.status(201).json(result.rows[0]);
    } catch {
        res.status(500).json({ message: 'Erro ao criar evento' });
    }
};

const GetEventById = async (req: Request, res: Response) => {
    const eventId = Number(req.params.eventId);
    if (!Number.isInteger(eventId)) {
        return res.status(400).json({ message: 'Evento invalido' });
    }

    try {
        const result = await pool.query('SELECT * FROM events WHERE id = $1', [eventId]);
        const event = result.rows[0];

        if (!event) {
            return res.status(404).json({ message: 'Evento nao encontrado' });
        }

        res.json(event);
    } catch {
        res.status(500).json({ message: 'Erro ao buscar evento' });
    }
};

const UpdateEvent = async (req: Request, res: Response) => {
    const eventId = Number(req.params.eventId);
    if (!Number.isInteger(eventId)) {
        return res.status(400).json({ message: 'Evento invalido' });
    }

    const dados = updateEventSchema.safeParse(req.body);
    if (!dados.success) return res.status(400).json({ message: 'Dados Invalidos' });

    const entries = Object.entries(dados.data);
    if (entries.length === 0) {
        return res.status(400).json({ message: 'Nenhum campo para atualizar' });
    }

    const setClauses = entries.map(([key], index) => `${key} = $${index + 1}`);
    const values: Array<string | boolean | number> = entries.map(([, value]) => value);
    values.push(eventId);

    try {
        const result = await pool.query(
            `UPDATE events SET ${setClauses.join(', ')} WHERE id = $${values.length} RETURNING *`,
            values,
        );
        const event = result.rows[0];

        if (!event) {
            return res.status(404).json({ message: 'Evento nao encontrado' });
        }

        res.json(event);
    } catch {
        res.status(500).json({ message: 'Erro ao atualizar evento' });
    }
};

const GetEvents = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM events ORDER BY starts_at DESC');
        const data = result.rows;
        res.json(data);
    } catch {
        res.status(500).json({ message: 'Erro ao buscar eventos' });
    }
};

const DeleteEvent = async (req: Request, res: Response) => {
    const eventId = Number(req.params.eventId);
    if (!Number.isInteger(eventId)) {
        return res.status(400).json({ message: 'Evento invalido' });
    }

    try {
        await pool.query('DELETE FROM consumption_items WHERE event_id = $1', [eventId]);
        await pool.query('DELETE FROM people WHERE event_id = $1', [eventId]);
        await pool.query('DELETE FROM events WHERE id = $1', [eventId]);
        res.json({ message: 'Evento deletado com sucesso' });
    } catch {
        res.status(500).json({ message: 'Erro ao deletar evento' });
    }
};

export { CreateEvent, GetEventById, GetEvents, UpdateEvent, DeleteEvent };