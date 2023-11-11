import React from "react";
import "./addMovie.css";
import CardMovie from "../cardMovie/cardMovie";
const AddMoviePreview = ({ state, categories, stateImages }) => {
  return (
    <div className="container-preview">
      <h2 className="title">Previsualización película agregada</h2>
      <CardMovie
        state={state}
        categories={categories}
        stateImages={stateImages}
      />
    </div>
  );
};

export default AddMoviePreview;
