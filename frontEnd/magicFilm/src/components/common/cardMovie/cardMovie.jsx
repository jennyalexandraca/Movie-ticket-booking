import React from "react";
import "./cardMovie.css";
import ScoreMovie from "../scoreMovie/ScoreMovie";
const CardMovie = ({ state, categories, stateImages }) => {
  console.log(
    "🚀 ~ file: cardMovie.jsx:4 ~ CardMovie ~ stateImages:",
    stateImages
  );
  let {
    title,
    gender,
    release_date,
    category_id,
    file_image,
    trailer,
    trailer_images,
    avg_score,
  } = state;
  let categorySelected = categories?.find(
    (cat) => cat.id == category_id
  )?.title;

  return (
    <div className="card-preview">
      <img src={file_image} alt="" className="card-movie-img" />
      <div className="card-movie-info">
        <h3
          style={{
            fontWeight: 700,
          }}
        >
          Detalle de la película
        </h3>
        <br />

        {title && (
          <p>
            <b className="card-movie-title">Título: </b>
            {title}
          </p>
        )}

        {release_date && (
          <p>
            <b className="card-movie-title">Fecha de estreno: </b>
            {release_date}
          </p>
        )}

        {gender && (
          <p>
            <b className="card-movie-title">Género: </b>
            {gender}
          </p>
        )}

        {categorySelected && (
          <p>
            <b className="card-movie-title">Categoria: </b>
            {categorySelected}
          </p>
        )}

        {trailer && (
          <>
            <b className="card-movie-title">Trailer: </b>
            <a href={trailer}>Ver Trailer</a>
          </>
        )}



        {stateImages?.length > 0 && (
          <div className="card-trailer-img">
            {stateImages.map((img, index) => (
              <img
                key={index}
                src={img.base64 || img.image}
                alt={img?.image?.filename}
              />
            ))}
          </div>
        )}
        {trailer_images?.length > 0 && (
          <div className="card-trailer-img">
            {trailer_images.map((img, index) => (
              <img key={index} src={img.image} alt={img.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardMovie;
