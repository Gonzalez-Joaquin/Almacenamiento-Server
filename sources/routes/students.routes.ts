import { Router } from 'express'

import controller from '../controller/students.controller'

const studentsRouter = Router()

studentsRouter.route('/')
    .get(controller.getEntries)
    .post(controller.addEntry)

studentsRouter.route('/')
    .put(controller.updateEntry)
    .delete(controller.deleteEntry)

export default studentsRouter