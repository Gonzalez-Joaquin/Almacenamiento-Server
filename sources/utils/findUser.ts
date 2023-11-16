interface Params {
    username: string,
    password: string,
    body: any
}

const findUser = ({ username, password, body }: Params) => {
    body.map((body: any) => {
        if (body.username === username) {
            if (body.password === password) {
                return body
            }
            throw new Error('Password no encontrada')
        }
        throw new Error('Username no encontrado')
    })
}

export default findUser