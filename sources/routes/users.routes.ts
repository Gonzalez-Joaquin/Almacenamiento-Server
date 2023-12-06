import { Router } from 'express'

import Controller from '../controller/user.controller'

const usersRouter = Router()

usersRouter.route('/')
    .get(Controller.getEntries)
    .post(Controller.addEntry)

usersRouter.route('/:id')
    .get(Controller.getEntry)
    .delete(Controller.deleteEntry)
    .put(Controller.updateEntry)

usersRouter.route('/login')
    .post(Controller.loginWithUsernameAndPassword)

export default usersRouter