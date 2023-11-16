import App from './app'

const Main = async () => {
    const servidor = new App()

    await servidor.Listen()
}

Main()