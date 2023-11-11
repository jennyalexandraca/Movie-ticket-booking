import React from "react";
import AddMovieContainer from "../../common/addMovie/AddMovieContainer";
import DeleteMovieContainer from "../../common/deleteMovie/DeleteMovieContainer";
import BackButton from "../../common/backButton/BackButton";

const AdminPanel = () => {
  return (
    <div className="admin-container">
      <h1 className="admin-title">
        Hola, bienvenidos al panel de administración
      </h1>
      <div className="admin-panel"></div>
      <BackButton />
    </div>
  );
};

export default AdminPanel;
