import { Request, Response } from "express"
import getConnection from "../database/database"
// import findTool from '../utils/findTool'

const getEntries = async (_req: Request, res: Response): Promise<Response | void> => {
    try {
        const connection = await getConnection()
        const allEntries = await connection.query('SELECT * FROM tools')
        return res.json(allEntries[0])
    }
    catch (err) {
        console.error('El problema es: ', err)
    }
}

const addEntry = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const newEntry = { name: req.body.name, stock: req.body.stock }
        const connection = await getConnection()
        await connection.query('INSERT INTO tools SET ?', [newEntry])
        return res.json({ message: 'Se añadio una herramienta' })
    }
    catch (err) {
        console.error('El problema es: ', err)
    }
}

const updateEntry = async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const connection = await getConnection()
        await connection.query('UPDATE tools set ? WHERE id = ?', [req.body, +req.params.id]);
        res.json({ message: 'Tu herramienta fue actualizada' });
    }
    catch (err) {
        throw new Error('Error: ' + err)
    }
}

const deleteEntry = async (req: Request, res: Response) => {
    try {
        const connection = await getConnection()
        await connection.query('DELETE FROM tools WHERE id = ?', [+req.params.id])
        res.status(200).json({ message: `Herramienta con id ${+req.params.id} fue eliminada` })
    }
    catch (err) {
        console.error('El problema es: ', err)
    }
}

export default { getEntries, addEntry, deleteEntry, updateEntry }