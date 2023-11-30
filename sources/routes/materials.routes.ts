import { Router } from 'express'

import controller from '../controller/materials.controller'

const materialRouter = Router()

materialRouter.route('/')
    .get(controller.getEntries)
    .post(controller.addEntry)

materialRouter.route('/:id')
    .get(controller.getEntry)
    .put(controller.updateEntry)
    .delete(controller.deleteEntry)


export default materialRouter