import { Router } from 'express'

import Controller from '../controller/tools.controller'

const toolsRouter = Router()

toolsRouter.route('/')
    .get(Controller.getEntries)
    .post(Controller.addEntry)

toolsRouter.route('/:id')
    .delete(Controller.deleteEntry)
    .put(Controller.updateEntry)

export default toolsRouter