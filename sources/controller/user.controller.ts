import { Request, Response } from "express"
import getConnection from "../database/database"
import findUser from "../utils/findUser"

const getEntries = async (_req: Request, res: Response): Promise<Response | void> => {
    try {
        const connection = await getConnection()
        const allEntries = await connection.query('SELECT * FROM users')
        return res.json(allEntries[0])
    }
    catch (err) {
        res.sendStatus(400).send(err)
    }
}

const addEntry = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const newEntry = { username: req.body.username, password: req.body.password, permissions: req.body.permissions }
        const connection = await getConnection()
        await connection.query('INSERT INTO users SET ?', [newEntry])
        return res.json({ message: 'Se añadio un usuario' })
    }
    catch (err) {
        res.sendStatus(400).send(err)
    }
}

const loginWithUsernameAndPassword = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const reqData = { username: req.body.username, password: req.body.password }
        const connection = await getConnection()
        const allEntries = await connection.query('SELECT * FROM users')
        const response = findUser({ username: reqData.username, password: reqData.password, body: allEntries[0] })
        return res.json(response)
    }
    catch (err) {
        return res.sendStatus(400)
    }
}

export default { getEntries, addEntry, loginWithUsernameAndPassword }