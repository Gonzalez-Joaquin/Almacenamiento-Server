import { Request, Response } from "express"
import getConnection from "../database/database"

const getEntries = async (_req: Request, res: Response): Promise<Response | void> => {
    try {
        const connection = await getConnection()
        const allEntries = await connection.query('SELECT * FROM materials')
        return res.json(allEntries[0])
    }
    catch (err) {
        res.sendStatus(400).send(err)
    }
}

const addEntry = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const connection = await getConnection()
        await connection.query('INSERT INTO materials SET ?', [req.body])
        return res.json({ message: 'Se añadio un material!' })
    }
    catch (err) {
        res.sendStatus(400).send(err)
    }
}

const getEntry = async (req: Request, res: Response) => {
    try {
        const connection = await getConnection()
        const entry = await connection.query('SELECT * FROM materials WHERE id = ?', [+req.params.id])
        res.json(entry[0])
    }
    catch (err) { res.sendStatus(400).send(err) }
}

const updateEntry = async (req: Request, res: Response) => {
    try {
        const connection = await getConnection()
        await connection.query('UPDATE students set ? WHERE id = ?', [req.body, +req.params.id]);
        res.json({ message: 'El material fue actualizado' });
    }
    catch (err) {
        res.sendStatus(400).send(err)
    }
}

const deleteEntry = async (req: Request, res: Response) => {
    try {
        const connection = await getConnection()
        await connection.query('DELETE FROM materials WHERE id = ?', [+req.params.id])
        res.status(200).json({ message: `Material con id ${+req.params.id} fue eliminado` })
    }
    catch (err) {
        res.sendStatus(400).send(err)
    }
}

export default { getEntries, addEntry, updateEntry, deleteEntry, getEntry }