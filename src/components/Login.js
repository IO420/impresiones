import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { envConfig } from '../envConfigurations/EnvConfigurations';
import './Impressions.css';

export const Login = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleLogin = async () => {
        const url = envConfig().apiUrl;
        setMessage("")

        try {
            const response = await axios.post(`${url}/login`, {
                user,
                password,
            });

            if (response.data?.token) {
                localStorage.setItem('token', response.data.token);
                setMessage('Inicio de sesión exitoso');
                navigate('/');
            } else {
                setMessage('Credenciales incorrectas');
            }
        } catch (error) {
            setMessage('Error de conexión');
        }
    };

    return (
        <section className="containerLogin">

            <div className="login">
                <h2 className="textHeader">Inicio de sesión</h2>

                <div className="containerInput">
                    <label className="label">Usuario</label>
                    <input
                        type="text"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        placeholder="Coloca tu usuario..."
                    />
                </div>

                <div className="containerInput">
                    <label className="label">Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Coloca tu contraseña..."
                    />
                </div>

                <button
                    className="button button-search"
                    onClick={handleLogin}>Iniciar sesión
                </button>
            </div>
            {message &&
                <div
                    className={`messageBox ${message.includes('exitoso') ? 'success' : 'error'}`}
                >
                    {message}
                </div>
            }
        </section>
    );
};
