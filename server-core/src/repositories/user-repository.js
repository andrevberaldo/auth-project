const DB_MOCK = [
    {
        id: '1',
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '1234',
        role: 'Operator'
    },
    {
        id: '2',
        name: 'your-name-here',
        email: 'your-email-here',
        password: '',
        role: 'manager'
    }
]

const getUserRole = (email) => {
    return DB_MOCK.find(user => user.email === email).role;
}

const findUser = (userEmail, password) => {
    const user = DB_MOCK.find(user => user.email === userEmail && user.password === password);

    if(!user) throw new Error('User not found');

    const { email, name, role, ...otherData } = user;

    return {
        email,
        name,
        role
    };
}

module.exports = { getUserRole, findUser }