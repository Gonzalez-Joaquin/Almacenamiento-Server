import { Request, Response } from "express"
import getConnection from "../database/database"

const getEntries = async (_req: Request, res: Response): Promise<Response | void> => {
    try {
        const connection = await getConnection()
        const allEntries = await connection.query('SELECT * FROM students')
        return res.json(allEntries[0])
    }
    catch (err) {
        res.sendStatus(400).send(err)
    }
}

const addEntry = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const connection = await getConnection()
        await connection.query('INSERT INTO students SET ?', [req.body])
        return res.json({ message: 'Se añadio un estudiante!' })
    }
    catch (err) {
        res.sendStatus(400).send(err)
    }
}

const getEntry = async (req: Request, res: Response) => {
    try {
        const connection = await getConnection()
        const entry = await connection.query('SELECT * FROM students WHERE id = ?', [+req.params.id])
        res.json(entry[0])
    }
    catch (err) { res.sendStatus(400).send(err) }
}

const updateEntry = async (req: Request, res: Response) => {
    try {
        const connection = await getConnection()
        await connection.query('UPDATE students set ? WHERE id = ?', [req.body, +req.params.id]);
        res.json({ message: 'El estudiante fue actualizado' });
    }
    catch (err) {
        res.sendStatus(400).send(err)
    }
}

const deleteEntry = async (req: Request, res: Response) => {
    try {
        const connection = await getConnection()
        await connection.query('DELETE FROM students WHERE id = ?', [+req.params.id])
        res.status(200).json({ message: `Estudiante con id ${+req.params.id} fue eliminado` })
    }
    catch (err) {
        res.sendStatus(400).send(err)
    }
}

export default { getEntries, addEntry, updateEntry, deleteEntry, getEntry }