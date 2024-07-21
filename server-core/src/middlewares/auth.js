const AuthService = require('../services/auth-service');

const isAuthorized = (req, res, next) => {
    try {
        const isValid = AuthService.validateToken(req.headers.authorization.split(' ')[1]);

        if (isValid) next();
    } catch (error) {
        res.status(403).send({ message: error})
    }
}

module.exports = { isAuthorized }