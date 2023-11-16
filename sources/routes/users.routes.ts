import { Router } from 'express'

import Controller from '../controller/user.controller'

const usersRouter = Router()

usersRouter.route('/')
    .get(Controller.getEntries)
    .post(Controller.addEntry)

usersRouter.route('/login')
    .post(Controller.loginWithUsernameAndPassword)

export default usersRouter