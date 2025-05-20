import axios from 'axios';
import { useEffect, useState } from 'react';
import { envConfig } from '../envConfigurations/EnvConfigurations';
import { useNavigate } from 'react-router-dom';
import './login.css';

export const Impressions = () => {
    const [numAccount, setNumAccount] = useState('');
    const [pages, setPages] = useState('');
    const [view, setView] = useState('impresiones');
    const [folio, setFolio] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState('');
    const [alert, setAlert] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [showError, setShowError] = useState(false);
    const [studentData, setStudentData] = useState(null);

    //restrict this month//
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const minFecha = new Date(year, month, 1).toISOString().split('T')[0];
    const maxFecha = new Date(year, month + 1, 0).toISOString().split('T')[0];
    //restrict this month//

    const url = envConfig().apiUrl;
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    //fadeOut alert and error 
    useEffect(() => {
        if (alert) {
            setShowAlert(true);
            const timeout = setTimeout(() => setShowAlert(false), 6000);
            return () => clearTimeout(timeout);
        }
    }, [alert]);

    useEffect(() => {
        if (error) {
            setShowError(true);
            const timeout = setTimeout(() => setShowError(false), 6000);
            return () => clearTimeout(timeout);
        }
    }, [error]);
    //fadeOut alert and error//


    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/Login');
    };

    const handleBuscar = async () => {
        setAlert('')
        setError('')
        if (!numAccount) {
            setError('Ingresa un numero de cuenta')
            return;
        }
        try {
            const response = await axios.post(
                `${url}/student`,
                {
                    numAccount: numAccount,
                },
                { headers }
            );
            const data = response.data;
            setStudentData(data);
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'No se encontró el estudiante';

            if (errorMessage === 'Token inválido') {
                handleLogout();
            }

            setError(errorMessage);
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
        if (!pages) {
            setError('Ingresa el numero de hojas a imprimir')
            return;
        }
        try {
            await axios.post(
                `${url}/impressions`,
                {
                    numAccount: numAccount,
                    pages: parseInt(pages),
                    cost: parseInt(pages),
                },
                { headers }
            );
            handleBuscar()
            setAlert('Cobro realizado correctamente');
            setPages('')
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'No se encontró el estudiante';

            if (errorMessage === 'Token inválido') {
                handleLogout();
            }

            setError(errorMessage);
        }
    };

    const handleGuardarRecibo = async () => {
        setAlert('')
        setError('')
        if (!studentData) {
            setError('Primero busca un estudiante');
            return;
        }
        if (!folio) {
            setError('Ingresa el numero de folio')
            return;
        }
        if (!amount) {
            setError('Ingresa el monto')
            return;
        }
        if (!date) {
            setError('Ingresa la fecha del ticket')
            return;
        }
        try {
            await axios.post(
                `${url}/receipt`,
                {
                    fol: folio,
                    amount: parseFloat(amount),
                    date: date,
                    numAccount: numAccount,
                },
                { headers }
            );
            handleBuscar()
            setAlert('Recibo guardado correctamente');
            setFolio('')
            setAmount('')
            setDate('')
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'No se encontró el estudiante';

            if (errorMessage === 'Token inválido') {
                handleLogout();
            }

            setError(errorMessage);
        }
    };

    return (
        <>
            <div className='formContainer'>
                <div className='containerInformation'>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleBuscar();
                        }}>

                        <label className='input-label'>No.Cuenta</label>
                        <div className='input-group'>
                            <input
                                type='text'
                                value={numAccount}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d*$/.test(value)) {
                                        setNumAccount(value);
                                    }
                                }}
                                className='input-field'
                                placeholder='Coloca un número de cuenta...'
                                inputMode='numeric'
                                pattern='[0-9]*'
                            />
                            <button
                                className='button button-search'
                                type='submit'>
                                Buscar
                            </button>
                        </div>
                    </form>

                    {studentData && (
                        <div className='information'>
                            <label><b>No.Cuenta: </b>{studentData[0]?.id_cuenta}</label>
                            <label><b>Nombre: </b>{studentData[0]?.nombre}</label>
                            <label><b>Carrera: </b>{studentData[0]?.carrera}</label>
                            <label><b>Crédito: </b>{studentData[0]?.credito}</label>
                        </div>
                    )}
                </div>
            </div>

            {studentData &&
                <div className='selection'>
                    <div className='toggle-group'>
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
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleCobrar();
                            }}>

                            <div className='impressions'>
                                <div className='groupLabel'>
                                    <label className='input-label'>Costo: $1.00</label>
                                </div>

                                <div className='input-group'>
                                    <label className='input-label'>Hojas:</label>
                                    <input
                                        type='text'
                                        value={pages}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^\d*$/.test(value)) {
                                                setPages(value);
                                            }
                                        }}
                                        className='input-field '
                                        placeholder='Numero de hojas a imprimir...'
                                    />
                                </div>

                                <div className='groupLabel'>
                                    <label className='input-label'>Total: {pages && `$${pages}.00`}</label>
                                </div>

                                <button
                                    className='button button-charge'
                                    type='submit'>
                                    Cobrar
                                </button>
                            </div>
                        </form>
                    )}

                    {view === 'recibo' && (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleGuardarRecibo();
                            }}>
                            <div className='impressions'>
                                <div className='input-group'>
                                    <label className='input-label'>Folio:</label>
                                    <input
                                        type='text'
                                        value={folio}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^\d*$/.test(value)) {
                                                setFolio(value);
                                            }
                                        }}
                                        className='input-field'
                                        placeholder='Numero de folio...'
                                    />
                                </div>

                                <div className='input-group'>
                                    <label className='input-label'>Monto:</label>
                                    <input
                                        type='text'
                                        value={amount}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^\d*$/.test(value)) {
                                                setAmount(value);
                                            }
                                        }}
                                        className='input-field'
                                        placeholder='Monto recibido...'
                                    />
                                </div>

                                <div className='input-group'>
                                    <label className='input-label'>Fecha:</label>
                                    <input
                                        type='date'
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className='input-field'
                                        min={minFecha}
                                        max={maxFecha}
                                    />
                                </div>

                                <button
                                    className='button button-search'
                                    type='submit'>
                                    Guardar
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            }
            <button onClick={handleLogout} className='button button-logout'>
                Cerrar sesión
            </button>
            {error &&
                <div className={`messageBox error ${!showError ? 'hidden' : ''}`}>
                    {error}
                </div>
            }
            {alert &&
                <div className={`messageBox success ${!showAlert ? 'hidden' : ''}`}>
                    {alert}
                </div>
            }
        </>
    );
};
//IO