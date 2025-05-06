import { useContext, useEffect, useState } from 'react';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import Hyperlink from '../../components/Hyperlink';
import PasswordField from '../../components/PasswordField';
import TextField from '../../components/TextField';
import { logInService } from '../../services/login';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Toast from '../../components/Toast';
import { ToastMessage } from '../../components/Toast/ToastProps';

const screenContainerStyles = 'flex flex-col items-center justify-center h-screen bg-black-900 text-white-900';
const loginContainerStyles = 'flex items-center justify-center w-full h-full';
const loginBoxStyles = 'flex items-center justify-center bg-black-500 rounded-lg w-[72rem] h-[40rem]';
const loginAreaStyles = 'flex flex-col gap-8 items-center justify-center w-1/2 h-full p-24 box-border';
const fieldsStyles = 'flex flex-col gap-4 items-center justify-center w-full';

const Login = () => {
    const { isAuthenticated, login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [returnMessage, setReturnMessage] = useState<ToastMessage>({
        message: '', variation: 'standard'
    });

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated]);

    return (
        <div className={screenContainerStyles}>
            <div className={loginContainerStyles}>
                <div className={loginBoxStyles}>
                    <main className={loginAreaStyles}>
                        <h1 className='text-3xl font-bold mb-4'>Entre na sua conta</h1>
                        <form className={fieldsStyles}>
                            <TextField
                                required
                                fullWidth
                                placeholder='Insira seu usuário'
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}
                            />
                            <PasswordField
                                required
                                placeholder='Insira sua senha'
                                onChange={(value: string) => setPassword(value)}
                            />
                            <Button
                                label='Entrar'
                                variation='standard'
                                loading={loading}
                                disabledStatus={loading}
                                onClick={() => logInService({ username, password, setLoading, setReturnMessage, login })}
                                key='confirm'
                                fullWidth
                            />
                        </form>

                        <Hyperlink
                            text='Esqueci minha senha'
                            url='#'
                        />
                    </main>
                    <img className='w-1/2 h-full object-cover rounded-r-lg' src='src/assets/login_cover.png' alt="" />
                </div>
            </div>
            <Footer />
            {returnMessage.message && <Toast
                toastMessage={returnMessage}
                messageSetter={setReturnMessage}
            />}
        </div>
    );
};

export default Login;
