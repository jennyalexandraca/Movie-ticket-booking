import React from "react";

import "./Reservation.css";
import ChooseHourContainer from "../../common/chooseHour/ChooseHourContainer";
import ChooseSeatContainer from "../../common/chooseSeat/ChooseSeatContainer";
import RatingMovieContainer from "../../common/ratingMovie/RatingMovieContainer";
import ScoreMovieContainer from "../../common/scoreMovie/ScoreMovieContainer";
import ProgressLine from "../../common/addProgressLine/ProgressLine";
import CalendarReservation from "../../common/addCalendar/CalendarReservation";
import { SeatCountProvider, useSeatCount } from "../../common/chooseSeat/ChooseSeat";
import { HourCountProvider, useHourCount } from "../../common/chooseHour/ChooseHour";

const Reservation = (props) => {
  const { dataMovie } = props;

  const myDate = new Date();

  console.log(dataMovie);
  return (
    <div className="ContainerReservation">
      <div id="sidebarReservation">
        <h2>Reserva</h2>

        <div className="reservation-image">
          <img src={dataMovie.image} alt="" />
        </div>

        <div className="reservation-sidebar-propertis-data">
          <ScoreMovieContainer dataMovie={dataMovie} />
          <h4>
            Título:{" "}
            <span className="container-detail-movie-properties-span">
              {dataMovie.title}
            </span>
          </h4>
          <h4>
            Fecha de estreno:{" "}
            <span className="container-detail-movie-properties-span">
              {dataMovie.release_date}
            </span>{" "}
          </h4>
          <h4>
            Género:{" "}
            <span className="container-detail-movie-properties-span">
              {dataMovie.gender?.name || dataMovie.gender}
            </span>
          </h4>
          <h4>
            Tráiler:{" "}
            <span className="container-detail-movie-properties-span">
              <a
                href={dataMovie.trailer}
                target="_blank"
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontWeight: "700",
                }}
              >
                Miralo aquí
              </a>
            </span>
          </h4>
        </div>
      </div>
      <div id="followUpReservation">
        <ProgressLine />
      </div>
      <div id="calendarReservation">
        <CalendarReservation />
      </div>
      <div id="hoursCinema">
      <HourCountProvider>
        <ChooseHourContainer />
        </HourCountProvider>
      </div>
      <div id="counterChairs">
        <SeatCountProvider>
          <ChooseSeatContainer />
        </SeatCountProvider>
      </div>
      <div id="dataReservation">
        <div className="container-data-reservation">
          <h3>Resumen de tu reserva</h3>
          <div className="container-data-reservation-properties">
            <h5>
              Titulo:<span> {dataMovie.title}</span>
            </h5>
            <h5>
              Hora:{" "}
              <span>
                {myDate.getHours() +
                  ":" +
                  myDate.getMinutes() +
                  ":" +
                  myDate.getSeconds()}
              </span>
            </h5>
            <h5>
              Total: <span>30000</span>
            </h5>
            <h5>
              Fecha de reserva: <span>{dataMovie.release_date}</span>
            </h5>
            <h5>
              Cantidad de asientos: <span>3</span>
            </h5>
          </div>
        </div>

        <div className="container-data-reservation-button">
          <button
            className="outline"
            type="button"
            style={{ marginTop: "25px", marginLeft: "15px" }}
            onClick={(e) => {}}
          >
            Cancelar
          </button>

          <button
            className="solid"
            type="submit"
            style={{ marginTop: "25px", marginLeft: "15px" }}
          >
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
