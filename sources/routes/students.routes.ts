import { Router } from 'express'

import controller from '../controller/students.controller'

const studentsRouter = Router()

studentsRouter.route('/')
    .get(controller.getEntries)
    .post(controller.addEntry)

studentsRouter.route('/:id')
    .get(controller.getEntry)
    .put(controller.updateEntry)
    .delete(controller.deleteEntry)

studentsRouter.route('/document/:id')
    .get(controller.getEntryByDocument)

export default studentsRouter