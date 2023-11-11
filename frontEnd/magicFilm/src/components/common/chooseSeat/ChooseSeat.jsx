import React, { useState, createContext, useContext } from 'react';
import './chooseSeat.css';

const SeatCountContext = createContext();

const SeatCountProvider = ({ children }) => {
    const [seatCount, setSeatCount] = useState(1);

    return (
        <SeatCountContext.Provider value={{ seatCount, setSeatCount }}>
            {children}
        </SeatCountContext.Provider>
    );
};

const useSeatCount = () => {
    const context = useContext(SeatCountContext);

    if (context === undefined) {
        throw new Error('useSeatCount debe ser utilizado dentro de un SeatCountProvider');
    }

    return context;
};

export { SeatCountProvider, useSeatCount };

const ChooseSeat = () => {
    const { seatCount, setSeatCount } = useSeatCount();
    const [value, setValue] = useState(String(seatCount));
    const [error, setError] = useState('');

    const handleChange = (event) => {
        const inputValue = event.target.value;

        if (/^\d*$/.test(inputValue)) {
            if (inputValue > 0 && inputValue <= 30) {
                setValue(inputValue);
                setError('');
                setSeatCount(parseInt(inputValue));
            } else {
                setValue(inputValue);
                setError('Debes ingresar mínimo 1 asiento y máximo 30.');
            }
        } else {
            setError('Debes ingresar un número válido.');
        }
    };

    return (
        <div className="seat-container">
            <div className="input-container">
                <input
                    type="text"
                    value={value}
                    onChange={handleChange}
                    inputMode="numeric"
                    className={error ? 'seat-input error' : 'seat-input'}
                />
            </div>
            {error && <p className="error-message">{error}</p>}
            <p className="text-center">Cantidad</p>
        </div>
    );
};

export default ChooseSeat;