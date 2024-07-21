import axios from 'axios';

export const getOAuth = async (token) => {
    const headers = {
        'Authorization': token
    };
    
    return await axios.get('http://localhost:3000/api/session/oauth', { headers })    
}

export const getSimpleAuth = async (email, password) => {
    const headers = {
        'Authorization': `${email}:${password}`
    }

    return await axios.get('http://localhost:3000/api/session', { headers })    
}