import { useState } from 'react';
import './Impressions.css';
import axios from 'axios';
import { envConfig } from '../envConfigurations/EnvConfigurations';

export const Login = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async () => {
        const url = envConfig().apiUrl;

        try {
            const response = await axios.post(url, {
                user,
                password,
            });

            if (response.data?.success) {
                setMessage('Inicio de sesión exitoso');
            } else {
                setMessage('Credenciales incorrectas');
            }
        } catch (error) {
            setMessage('Error de conexión');
        }
    };

    return (
        <section className="containerLogin">
            <h2 className="textHeader">Inicio de sesión</h2>

            <div class="containerInput">
                <label className="label">Usuario</label>
                <input
                    type="text"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    placeholder="Coloca tu usuario..."
                />
            </div>

            <div class="containerInput">
                <label className="label">Contraseña</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Coloca tu contraseña..."
                />
            </div>


            <button
                class="button button-search"
                onClick={handleLogin}>Iniciar sesión</button>

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
