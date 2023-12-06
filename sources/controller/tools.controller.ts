import { Request, Response } from "express"
import getConnection from "../database/database"

const getEntries = async (_req: Request, res: Response): Promise<Response | void> => {
    try {
        const connection = await getConnection()
        const allEntries = await connection.query('SELECT * FROM tools')
        return res.json(allEntries[0])
    }
    catch (err) {
        res.sendStatus(400).send(err)
    }
}

const addEntry = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const connection = await getConnection()
        await connection.query('INSERT INTO tools SET ?', [req.body])
        return res.json({ message: 'Se añadio una herramienta' })
    }
    catch (err) {
        res.sendStatus(400).send(err)
    }
}

const getEntry = async (req: Request, res: Response) => {
    try {
        const connection = await getConnection()
        const entry = await connection.query('SELECT * FROM tools WHERE id = ?', [+req.params.id])
        res.json(entry[0])
    }
    catch (err) { res.sendStatus(400).send(err) }
}

const updateEntry = async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const connection = await getConnection()
        await connection.query('UPDATE tools set ? WHERE id = ?', [req.body, +req.params.id]);
        res.json({ message: 'Tu herramienta fue actualizada' });
    }
    catch (err) {
        res.sendStatus(400).send(err)
    }
}

const deleteEntry = async (req: Request, res: Response) => {
    try {
        const connection = await getConnection()
        await connection.query('DELETE FROM tools WHERE id = ?', [+req.params.id])
        res.status(200).json({ message: `Herramienta con id ${+req.params.id} fue eliminada` })
    }
    catch (err) {
        res.sendStatus(400).send(err)
    }
}

export default { getEntries, addEntry, deleteEntry, updateEntry, getEntry }