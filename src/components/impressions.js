import { useState } from 'react';
import './Impressions.css';

export const Impressions = () => {
    const [numero, setNumero] = useState('');
    const [hojas, setHojas] = useState('');
    const [view, setView] = useState('impresiones');
    const [folio, setFolio] = useState('');
    const [monto, setMonto] = useState('');
    const [fecha, setFecha] = useState('');

    const handleBuscar = () => {
        console.log('Buscar número:', numero);
    };

    const handleCobrar = () => {
        console.log('Cobrar por hojas:', hojas);
    };

    const handleGuardarRecibo = () => {
        alert(`Recibo guardado:\nFolio: ${folio}\nMonto: ${monto}\nFecha: ${fecha}`);
    };

    return (
        <div className="impressions-container">
            <h3 className="impressions-title lineSeparator">IMPRESIONES</h3>

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
                        <div>
                            <label className="input-label">Costo: $1.00 peso</label>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Hojas:</label>
                            <input
                                type="text"
                                value={hojas}
                                onChange={(e) => setHojas(e.target.value)}
                                className="input-field"
                                placeholder='Numero de hojas a imprimir...'
                            />
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

            <div className="img"></div>
        </div>
    );
};
