import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import usersRouter from './routes/users.routes'

class App {
    private App: express.Application

    constructor(private PORT?: number | string) {
        this.App = express()
        this.Settings()
        this.MiddleWares()
        this.Routes()
    }

    Settings() { this.App.set('port', this.PORT || process.env.PORT || 5000) }

    MiddleWares() {
        this.App.use(morgan('dev'))
        this.App.use(express.json())
        this.App.use(cors())
    }

    Routes() {
        this.App.use('/users', usersRouter)
    }

    async Listen(): Promise<void> {
        await this.App.listen(this.App.get('port'))
        console.log('Server running in Port:', this.App.get('port'))
    }
}

export default App