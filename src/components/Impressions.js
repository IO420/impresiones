import axios from 'axios';
import { useState } from 'react';
import { envConfig } from '../envConfigurations/EnvConfigurations';
import { useNavigate } from 'react-router-dom';
import './login.css';

export const Impressions = () => {
    const [numero, setNumero] = useState('');
    const [hojas, setHojas] = useState('');
    const [view, setView] = useState('impresiones');
    const [folio, setFolio] = useState('');
    const [monto, setMonto] = useState('');
    const [fecha, setFecha] = useState('');
    const [error, setError] = useState('');
    const [alert, setAlert] = useState('');
    const [studentData, setStudentData] = useState(null);

    const url = envConfig().apiUrl;
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const handleBuscar = async () => {
        setAlert('')
        setError('')
        try {
            const response = await axios.post(
                `${url}/student`,
                {
                    numAccount: numero,
                },
                {
                    headers,
                }
            );
            const data = response.data;
            setStudentData(data);
            setAlert('Estudiante encontrado');
        } catch (error) {
            setError(error.response?.data?.error || 'No se encontró el estudiante');
            setStudentData(null);
        }
    };

    const handleCobrar = async () => {
        setAlert('')
        setError('')
        if (!studentData) {
            setError('Error busca denuevo al estudiante');
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
            setAlert('Cobro realizado correctamente');
            handleBuscar()
        } catch (error) {
            setError(error.response?.data?.error || 'Error al realizar el cobro');
        }
    };

    const handleGuardarRecibo = async () => {
        setAlert('')
        setError('')
        if (!studentData) {
            setError('Primero busca un estudiante');
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
            setAlert('Recibo guardado correctamente');
            handleBuscar()
        } catch (error) {
            setError(error.response?.data?.error || 'Error al guardar el recibo');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/Login');
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

                    {studentData && (
                        <div className="information">
                            <label>No.Cuenta: {studentData[0]?.id_cuenta}</label>
                            <label>Nombre: {studentData[0]?.nombre}</label>
                            <label>Crédito: {studentData[0]?.credito}</label>
                        </div>
                    )}
                </div>
            </div>

            {studentData &&
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
            }
            <button onClick={handleLogout} className="button button-logout">
                Cerrar sesión
            </button>
            {error &&
                <div className={`messageBox error`}>
                    {error}
                </div>
            }
            {alert &&
                <div className={`messageBox success`}>
                    {alert}
                </div>
            }
        </>
    );
};
