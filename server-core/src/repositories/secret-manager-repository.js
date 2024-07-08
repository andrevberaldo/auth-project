// replace this with the real aws secret manager client
const SECRET_MANAGER_MOCK = {
    JWT_PRIVATE_HASH: 'private_hash_key'
}

const getSecret = (secretId) => {
    return SECRET_MANAGER_MOCK[secretId]
}

module.exports = {
    getSecret
}