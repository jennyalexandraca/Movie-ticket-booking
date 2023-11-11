import React from "react";
import InfoMovie from "../infoMovie/InfoMovie";

const recommendedMovies = ({ dataMovies }) => {
  return (
    <div className="container-home-card">
      {dataMovies.map((movie) => (
        <InfoMovie key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default recommendedMovies;
