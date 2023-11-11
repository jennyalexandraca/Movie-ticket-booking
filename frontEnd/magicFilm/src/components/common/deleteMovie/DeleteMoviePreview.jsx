import React from "react";
//import "./addMovie.css";
import CardMovie from "../cardMovie/cardMovie";

const DeleteMoviePreview = ({ state }) => {
  return (
    <div className="container-preview">
      <h2 className="title">Previsualización película a eliminar</h2>
      <CardMovie state={state} />
    </div>
  );
};

export default DeleteMoviePreview;
