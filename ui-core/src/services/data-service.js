import axios from 'axios';

export const getPrivateData = async (userCredential) => {
    console.log(userCredential);
    const headers = {
        'Authorization': `bearer ${userCredential}`
    }

    return await axios.get('http://localhost:3000/api/private-data', { headers })
}