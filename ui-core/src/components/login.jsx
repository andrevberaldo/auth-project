import { GoogleLogin } from '@react-oauth/google';
import { getOAuth, getSimpleAuth } from '../services/auth-service'; 
import { useState } from 'react';

export const LoginForm = ({ onSuccessLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
    const onSuccess = async (googleCredentials) => {        
        const response = await getOAuth(googleCredentials.credential)
        onSuccessLogin(response.data);
    };
    
    const onError = (error) => console.log('Login Failed', error);

    const onClick = async () => {
        const response = await getSimpleAuth(email, password);
        onSuccessLogin(response.data);        
    }

    return (
        <>
            <form action="" style={{ display: 'flex', 'flex-direction': 'column', gap: 5 }}>
                <input type="text" placeholder="email" onChange={(evt) => setEmail(evt.target.value)}/>
                <input type="password" placeholder="password" onChange={(evt) => setPassword(evt.target.value)}/>
            </form>
            
            <button disabled={!email || !password} onClick={onClick}>Entrar</button>
            
            <GoogleLogin            
                onSuccess={onSuccess}
                onError={onError}
            />
        </>

    )
}