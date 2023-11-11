import React, { useState } from "react";
// import MovieDetailContainer from "../../pages/movieDetail/MovieDetailContainer";
import SearchMovieContainer from "./searchMovie/SearchMovieContainer";
import { getMovie, deleteMovie } from "../../../service/productServices";
import "./deleteMovie.css";
// import CardMovie from "../cardMovie/cardMovie";
import DeleteMoviePreview from "./DeleteMoviePreview";
import "../../pages/adminPanel/AdminPanel.css";
import Swal from "sweetalert2";
const DeleteMovie = () => {
  const [dataSearch, setDataSearch] = useState("");
  const [data, setData] = useState(null);

  const handleSearch = async (e) => {
    setData(await getMovie(e));
  };

  return (
    <div className="formulario-delete-movie">
      <div className="container-form">
        <div className="titulo-delete-movie">Eliminar película</div>

        <SearchMovieContainer
          setDataSearch={setDataSearch}
          dataSearch={dataSearch}
          handleSearch={handleSearch}
        />

        <DeleteMoviePreview state={data?.data.length > 0 ? data.data[0] : {}} />

        <button
          onClick={(e) => {
            deleteMovie(data?.data[0].id);
            e.preventDefault();

            Swal.fire({
              title: "¿Está seguro que quiere eliminar esta película?",
              // text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#00c9c8",
              cancelButtonColor: "#d33",
              confirmButtonText: "Si, eliminar!",
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire(
                  "Eliminada!",
                  "La película se ha eliminado correctamente.",
                  "success"
                );
              }
            });
          }}
          className="solid"
        >
          Eliminar película
        </button>
      </div>
    </div>
  );
};

export default DeleteMovie;
