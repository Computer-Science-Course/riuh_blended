const screenContainerStyles = 'flex flex-col items-center justify-center h-screen bg-black-900 text-white-900';
const loginContainerStyles = 'flex items-center justify-center w-full h-full';
const loginBoxStyles = 'flex items-center justify-center bg-black-500 rounded-lg';
const loginAreaStyles = 'flex flex-col gap-8 items-center justify-center p-24 w-full';
const fieldsStyles = 'flex flex-col gap-4 items-center justify-center w-full';

import { useState } from 'react';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Hyperlink from '../components/Hyperlink';
import PasswordField from '../components/PasswordField';
import TextField from '../components/TextField';
import { logIn } from '../services/login';

const Login = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [returnMessage, setReturnMessage] = useState<string>('');
    if (returnMessage) {
        alert(returnMessage);
        setReturnMessage('');
    }

    return (
        <div className={screenContainerStyles}>
            <div className={loginContainerStyles}>
                <div className={loginBoxStyles}>
                    <main className={loginAreaStyles}>
                        <h1 className='text-3xl font-bold mb-4'>Entre na sua conta</h1>
                        <div className={fieldsStyles}>
                            <TextField
                                required
                                placeholder='Insira seu usuário'
                                storeFieldValue={(value: string) => setUsername(value)}
                            />
                            <PasswordField
                                required
                                placeholder='Insira sua senha'
                                storeFieldValue={(value: string) => setPassword(value)}
                            />
                            <Button
                                label='Entrar'
                                variation='standard'
                                loading={loading}
                                disabledStatus={loading}
                                onClick={() => logIn({ username, password, setLoading, setReturnMessage })}
                                key='confirm'
                                fullWidth
                            />
                        </div>

                        <Hyperlink
                            text='Esqueci minha senha'
                            url='#'
                        />
                    </main>
                    <img src='src/assets/login_cover.png' alt="" />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Login;
