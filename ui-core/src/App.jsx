import './App.css'

import { API_KEY } from './constants/constants'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { LoginForm } from './components/login';
import { useState } from 'react';
import { Content } from './content/content';

function App() {
    const [isLogged, setIsLogged] = useState(false);
    const [systemToken, setSistemToken] = useState('');
    const [picture, setPicture] = useState('')
    const [name, setName] = useState('')
    const [role, setRole] = useState('')

    const onSuccessLogin = (userProfile) => {
        setIsLogged(true);
        setPicture(userProfile.picture);
        setName(userProfile.name)
        setRole(userProfile.role)
        setSistemToken(userProfile.credential)
    }

    return (
        <>
            {!isLogged && <GoogleOAuthProvider clientId={API_KEY}>
                <LoginForm
                    onSuccessLogin={onSuccessLogin}
                    onFailLogin={() => alert('Failed to Login')}
                />
            </GoogleOAuthProvider>}

            {isLogged && <Content 
                userName={name}
                userPicture={picture}
                userRole={role}
                userCredential={systemToken}
            />}
        </>

    )
}

export default App
