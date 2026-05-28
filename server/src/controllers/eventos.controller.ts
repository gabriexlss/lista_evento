import { Request, Response } from 'express'
import { pool } from '../db'
import { newEventSchema } from '../models'

const CreateEvent = async ( req: Request, res: Response) => {
    const dados = newEventSchema.safeParse(req.body)
    if (!dados.success) return res.status(400).json({ message: 'Dados Invalidos' })
    
    const { name, starts_at, is_birthday, rodizio_price, location } = dados.data

    try{
        const result = await pool.query(
            `INSERT INTO events (name, starts_at, is_birthday, rodizio_price, location) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [name, starts_at, is_birthday, rodizio_price, location]
        )
        res.status(201).json(result.rows[0])
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar evento' })
    }
}
const GetEvents = async ( req: Request, res: Response) => {
    try {
        const result = await pool.query(`SELECT * FROM events ORDER BY starts_at DESC`)
        const data = result.rows
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar eventos' })
    }
}

export { CreateEvent, GetEvents }