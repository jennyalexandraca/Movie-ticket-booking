import React, { useState, createContext, useContext } from "react";
import "./chooseHour.css";

const HourCountContext = createContext();

const HourCountProvider = ({ children }) => {
    const [hourCount, setHourCount] = useState(1);

    return (
        <HourCountContext.Provider value={{ hourCount, setHourCount }}>
            {children}
        </HourCountContext.Provider>
    );
};

const useHourCount = () => {
    const context = useContext(HourCountContext);

    if (context === undefined) {
        throw new Error(
            "useHourCount debe ser utilizado dentro de un HourCountProvider"
        );
    }

    return context;
};


export { HourCountProvider, useHourCount };

const ChooseHour = () => {
    const { hourCount, setHourCount } = useHourCount();
    const [selectedHour, setSelectedHour] = useState(null);

    const handleHourClick = (hour) => {
        if (selectedHour === hour) {
            setSelectedHour(null);
        } else {
            setSelectedHour(hour);
        }
    };

    const isHourSelected = (hour) => {
        return selectedHour === hour;
    };

    return (
        <div className="choose-hour">
            <table className="funciones">
                <tbody>
                    <tr>
                        <th colSpan="2" className="title-cell">
                            Funciones
                        </th>
                    </tr>
                    <tr className="space-row"></tr>
                    <tr className="table_hours">
                        <td className="title_rows_hours">Mañana</td>
                        <td>
                            <div className="hour-row">
                                <button
                                    className={`hour-button ${isHourSelected("05:40am") ? "active" : ""
                                        }`}
                                    onClick={() => handleHourClick("05:40am")}
                                >
                                    05:40am
                                </button>
                                <button
                                    className={`hour-button ${isHourSelected("09:40am") ? "active" : ""
                                        }`}
                                    onClick={() => handleHourClick("09:40am")}
                                >
                                    09:40am
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr className="space-row"></tr>
                    <tr className="table_hours">
                        <td className="title_rows_hours">Tarde</td>
                        <td>
                            <div className="hour-row">
                                <button
                                    className={`hour-button ${isHourSelected("07:40pm") ? "active" : ""
                                        }`}
                                    onClick={() => handleHourClick("07:40pm")}
                                >
                                    07:40pm
                                </button>
                                <button
                                    className={`hour-button ${isHourSelected("06:10pm") ? "active" : ""
                                        }`}
                                    onClick={() => handleHourClick("06:10pm")}
                                >
                                    06:10pm
                                </button>
                            </div>
                            <div className="hour-row">
                                <button
                                    className={`hour-button ${isHourSelected("03:30pm") ? "active" : ""
                                        }`}
                                    onClick={() => handleHourClick("03:30pm")}
                                >
                                    03:30pm
                                </button>
                                <button
                                    className={`hour-button ${isHourSelected("10:55pm") ? "active" : ""
                                        }`}
                                    onClick={() => handleHourClick("10:55pm")}
                                >
                                    10:55pm
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ChooseHour;
