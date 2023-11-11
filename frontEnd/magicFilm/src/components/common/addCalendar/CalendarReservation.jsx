import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./CalendarReservation.css"
class CalendarReservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: null,
      availableReservations: [],
    };
  }

  componentDidMount() {
    // Obtener las fechas disponibles para los próximos 40 días con horas y salas
    const today = new Date();
    const availableReservations = [];

    for (let i = 0; i < 40; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);

      const reservations = {
        date: date,
      };

      availableReservations.push(reservations);
    }

    this.setState({ availableReservations });
  }


  handleDateSelect = (date) => {
    // Verificar si la fecha seleccionada está disponible
    const selectedReservation = this.state.availableReservations.find(
      (reservations) => reservations.date.toLocaleDateString() === date.toLocaleDateString()
    );

    if (selectedReservation) {
      this.setState({ selectedDate: date });
    } else {
      // La fecha no está disponible
      alert('La fecha seleccionada no está disponible');
    }
  };

  render() {
    const { selectedDate, availableReservations } = this.state;

    return (
      <div>
        <h2>Elige una fecha</h2>
        <div className="calendar-container">
          
          <div className="calendar">
            <Calendar
              onChange={this.handleDateSelect}
              value={selectedDate}
              tileDisabled={({ date }) =>
                !availableReservations.find(
                  (reservations) => reservations.date.toLocaleDateString() === date.toLocaleDateString()
                )
              }
            />
          </div>
          <div className="container-data-reservation-button">
    {/*       <button
            className="outline"
            type="button"
            style={{ marginTop: "25px", marginLeft: "15px", width:"90px" }}
            onClick={(e) => {}}
          >
            Quitar
          </button>

          <button
            className="solid"
            type="submit"
            style={{ marginTop: "25px", marginLeft: "15px",width:"100px" }}
          >
            Seleccinar
          </button> */}
        </div>
        </div>
       
      </div>
    );
  }
}

export default CalendarReservation;
