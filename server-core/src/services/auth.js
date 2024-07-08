const jsonwebtoken = require('jsonwebtoken')
const { getSecret } = require('../repositories/secret-manager-repository')

const createToken = (user) => {
    const signHash = getSecret('JWT_PRIVATE_HASH');

    return jsonwebtoken.sign(
        { user: JSON.stringify(user) },
        signHash,
        { expiresIn: '5m' }
    )
}

const validateToken = (token) => {
    const signHash = getSecret('JWT_PRIVATE_HASH');

    try {
        return jsonwebtoken.verify(token, signHash)
    } catch(e) {
        console.log('Failed to verify the given Token')
        throw e
    }
    
}

module.exports = {
    createToken,
    validateToken
}