import { useState } from 'react';
import { getPrivateData } from '../services/data-service';

export const Content = ({ userName, userRole, userPicture, userCredential }) => {
    const [privateData, setPrivateData] = useState(null);
    const [error, setError] = useState(null);

    const onClick = async () => {
        try {
            const response = await getPrivateData(userCredential);
            setPrivateData(response.data);
        } catch (error) {
            setError(error.response.data);
        }
    }

    return (
        <div>
            <div>{userName}</div>                        
            <div>{userRole}</div>
            <img src={userPicture} />
            
            <div>THIS IS THE SYSTEM CONTENT... You are Logged In 🚀</div>
            
            <button onClick={onClick}>Get Private Data</button>

            {privateData && <p>{privateData}</p>}

            {error && <p>Oh oh! {JSON.stringify(error)}</p>}
        </div>
    )
}