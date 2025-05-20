import { useState } from 'react';
import axios from 'axios';
import { envConfig } from '../envConfigurations/EnvConfigurations';
import './login.css';

export const Impressions = () => {
    const [numero, setNumero] = useState('');
    const [hojas, setHojas] = useState('');
    const [view, setView] = useState('impresiones');
    const [folio, setFolio] = useState('');
    const [monto, setMonto] = useState('');
    const [fecha, setFecha] = useState('');
    const [message, setMessage] = useState('');
    const [studentData, setStudentData] = useState(null);

    const url = envConfig().apiUrl;
    const token = localStorage.getItem('token');

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const handleBuscar = async () => {
        try {
            const response = await axios.get(`${url}/student`, {
                headers,
                params: {
                    numAccount: numero,
                },
            });
            const data = response.data;
            setStudentData(data);
            setMessage('Estudiante encontrado');
        } catch (error) {
            console.error('Error al buscar:', error);
            setMessage('No se encontró el estudiante');
            setStudentData(null);
        }
    };

    const handleCobrar = async () => {
        if (!studentData) {
            setMessage('Primero busca un estudiante');
            return;
        }
        try {
            await axios.post(
                `${url}/impressions`,
                {
                    numAccount: numero,
                    pages: parseInt(hojas),
                    cost: parseInt(hojas),
                },
                { headers }
            );
            setMessage('Cobro realizado correctamente');
        } catch (error) {
            console.error(error);
            setMessage('Error al realizar el cobro');
        }
    };

    const handleGuardarRecibo = async () => {
        if (!studentData) {
            setMessage('Primero busca un estudiante');
            return;
        }
        try {
            await axios.post(
                `${url}/receipt`,
                {
                    fol: folio,
                    amount: parseFloat(monto),
                    date: fecha,
                    numAccount: numero,
                },
                { headers }
            );
            setMessage('Recibo guardado correctamente');
        } catch (error) {
            console.error(error);
            setMessage('Error al guardar el recibo');
        }
    };

    return (
        <>
            <div className="formContainer">
                <div className="containerInformation">
                    <label className="input-label">No.Cuenta</label>
                    <div className="input-group">
                        <input
                            type="text"
                            value={numero}
                            onChange={(e) => setNumero(e.target.value)}
                            className="input-field"
                            placeholder="Coloca un número de cuenta..."
                        />
                        <button onClick={handleBuscar} className="button button-search">
                            Buscar
                        </button>
                    </div>

                    <div className="information">
                        <label>No.Cuenta:</label>
                        <label>Nombre:</label>
                        <label>Credito:</label>
                    </div>
                </div>
            </div>

            <div className="selection">
                <div className="toggle-group">
                    <button
                        className={`toggle-button ${view === 'impresiones' ? 'active' : ''}`}
                        onClick={() => setView('impresiones')}
                    >
                        Impresiones
                    </button>
                    <button
                        className={`toggle-button ${view === 'recibo' ? 'active' : ''}`}
                        onClick={() => setView('recibo')}
                    >
                        Recibo
                    </button>
                </div>


                {view === 'impresiones' && (
                    <div className="impressions">
                        <div className="groupLabel">
                            <label className="input-label">Costo: $1.00</label>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Hojas:</label>
                            <input
                                type="text"
                                value={hojas}
                                onChange={(e) => setHojas(e.target.value)}
                                className="input-field "
                                placeholder='Numero de hojas a imprimir...'
                            />
                        </div>

                        <div className="groupLabel">
                            <label className="input-label">Total: {hojas && `$${hojas}.00`}</label>
                        </div>

                        <button onClick={handleCobrar} className="button button-charge">
                            Cobrar
                        </button>
                    </div>
                )}

                {view === 'recibo' && (
                    <div className="impressions">
                        <div className="input-group">
                            <label className="input-label">Folio:</label>
                            <input
                                type="text"
                                value={folio}
                                onChange={(e) => setFolio(e.target.value)}
                                className="input-field"
                                placeholder='Numero de folio...'
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">Monto:</label>
                            <input
                                type="text"
                                value={monto}
                                onChange={(e) => setMonto(e.target.value)}
                                className="input-field"
                                placeholder='Monto recibido...'
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">Fecha:</label>
                            <input
                                type="date"
                                value={fecha}
                                onChange={(e) => setFecha(e.target.value)}
                                className="input-field"
                            />
                        </div>

                        <button onClick={handleGuardarRecibo} className="button button-search">
                            Guardar
                        </button>
                    </div>
                )}
            </div>
            {message &&
                <div
                    className={`messageBox ${message.includes('exitoso') ? 'success' : 'error'}`}
                >
                    {message}
                </div>
            }
        </>
    );
};
