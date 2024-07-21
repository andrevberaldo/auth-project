const express = require('express')
var cors = require('cors')
const AuthService = require('./services/auth-service')
const AuthMiddleware = require('./middlewares/auth');
const UserRepository = require('./repositories/user-repository');

const PORT = 3000
const api = express()

api.use(cors())

api.get('/api/session/oauth', (req, res) => {
    const credential = req.headers.authorization;

    try {
        const sistemCredentials = AuthService.exchangeToken(credential);
        res.status(200).send(sistemCredentials)
    } catch (error) {
        res.status(404).send({ message: error })        
    }
})

api.get('/api/session', (req, res) => {
    const credential = req.headers.authorization;

    if(!credential) {
        res.status(403).send({ message: 'Missing credentials' })
    }

    const [email, password] = credential.split(':');

    try {
        const user = UserRepository.findUser(email, password);
        res.status(200).send({
            ...user,
            credential: AuthService.createToken(user)
        })
    } catch (error) {
        res.status(404).send({ message: error })
    }
})

api.get('/api/private-data', AuthMiddleware.isAuthorized, (_, res) => {
    res.status(200).send('THIS IS A PRIVATE DATA, YOU ARE G2G');
});

api.listen(PORT, () => {
    console.log(`Server runing on ${PORT}`);
})