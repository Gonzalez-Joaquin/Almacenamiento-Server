import { Router } from 'express'

import categoryController from '../controller/category.controller'

const categoryRouter = Router()

categoryRouter.route('/')
    .get(categoryController.getEntries)
    .post(categoryController.addEntry)

categoryRouter.route('/:id')
    .get(categoryController.getEntry)
    .put(categoryController.updateEntry)
    .delete(categoryController.deleteEntry)

export default categoryRouter