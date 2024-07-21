const jwt = require('jsonwebtoken')
const SecretManagerRepository = require('../repositories/secret-manager-repository')
const UserRepository = require('../repositories/user-repository');

const exchangeToken = (credential) => {                    
    const {
        email,
        name,
        picture
    } = jwt.decode(credential);

    const userRole = UserRepository.getUserRole(email)

    if(!userRole)
        throw new Error('User not found')

    const user = {
        email,
        name,
        picture,
        role: userRole
    }

    return {
        ...user,
        credential: createToken(user)
    };
}

const createToken = (user) => {
    const signHash = SecretManagerRepository.getSecret('JWT_PRIVATE_HASH');

    return jwt.sign(
        { user: JSON.stringify(user) },
        signHash,
        { expiresIn: '5m' }
    )
}

const validateToken = (token) => {
    const signHash = SecretManagerRepository.getSecret('JWT_PRIVATE_HASH');

    try {
        return jwt.verify(token, signHash)
    } catch(e) {
        console.log('Failed to verify the given Token')
        throw e
    }
    
}

module.exports = {
    createToken,
    validateToken,
    exchangeToken
}