const express = require('express')
const AuthService = require('./services/auth')

const PORT = 3000

const api = express()

api.get('/', (req, res) => {
    res.send('Public route')
})

api.get('/login', (req, res) => {
    const [login, password] = req.headers.authorization.split(':')

    const isValidLogin = login === 'John' && password === '1234'    
    const status = isValidLogin ? 200 : 401
    const authBody = isValidLogin ? {
        status: 'ok',
        token: AuthService.createToken({ name: 'John', lastName: 'Doe', role: 'Tech Lead' })
    } : { status: 'login or password invalid!' }

    res.status(status).send(authBody)
})

api.get('/private', (req, res) => {
    let status;
    let body;
    const [_, token] = req.headers.authorization.split(' ')

    try {
        AuthService.validateToken(token)
        status = 200
        body = {
            status: 'ok',
            message: 'your are loged in!'
        }
    } catch(error) {        
        status = 401
        body = {
            status: 'unauthorized',
            message: error
        }
    } finally {
        res.status(status).send(body)
    }
})

api.listen(PORT, () => {
    console.log(`Server runing on ${PORT}`);
})