import React from "react";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import "./infoMovie.css";

const InfoMovie = ({ movie }) => {
  return (
    <div key={movie.id} className="card-container-search-movies">
      <img src={movie.image} alt="" className="img-search-movies" />
      <br />
      <div className="info-search-movie">
        <h4>
          Titulo: <p>{movie.title}</p>
        </h4>
        <h4>
          Estreno: <p>{movie.release_date}</p>
        </h4>
        <h4>
          Género: <p>{movie.gender}</p>
        </h4>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <h4>Valoracion Promedio:</h4>

          <StarIcon
            fontSize="string"
            sx={{ color: "#ffd700", fontSize: "30px" }}
          />

          <p>{movie.avg_score || "0.0"}</p>
        </div>
        <br />
        <Link to={`/details/${movie.id}`}>
          <button className="button-search-detail">Ver más</button>
        </Link>
      </div>
    </div>
  );
};

export default InfoMovie;
