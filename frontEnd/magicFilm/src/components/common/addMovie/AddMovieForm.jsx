import React, { useState, useRef } from "react";
import "./addMovie.css";
import iconClip from "../../../assets/icon/clip.svg";

import AddCategoryContainer from "../addCategory/AddCategoryContainer";
import AddTrailerImages from "../addTrailerImages/AddTrailerImages";
import CustomDateButton from "../customDateButton/customDateButton";
import { format, parse } from "date-fns";

const AddMovie = ({
  state,
  setState,
  setCategories,
  categories,
  stateImages,
  setStateImages,
  handleSubmit,
  children,
}) => {
  const [open, setOpen] = useState(false);
  const release_ref = useRef(null);
  const handleStateImages = async (images) => {
    const imageObjects = [];

    for (const image of images) {
      const file = image;
      const reader = new FileReader();

      // Crear una promesa para leer el archivo y convertirlo a base64
      const readImageAsBase64 = () =>
        new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file);
        });

      try {
        const base64 = await readImageAsBase64();

        // Crear el objeto JSON con los datos requeridos
        const imageObject = {
          filename: file.name,
          image: file,
          base64: base64,
        };

        imageObjects.push(imageObject);
      } catch (error) {
        console.error("Error al leer la imagen:", error);
      }
    }

    setStateImages(imageObjects);
    console.log(
      "🚀 ~ file: AddMovieForm.jsx:55 ~ handleStateImages ~ imageObjects:",
      imageObjects
    );
  };

  const handleInputChange = (event) => {
    event.target.setCustomValidity("");
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    event.target.setCustomValidity("");
    const file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      if (file) {
        setState({
          ...state,
          [event.target.name]: file,
          file_image: e.target.result,
        });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={handleSubmit} className="formulario-add-movie">
      <h2 className="title">Agregar película</h2>
      <hr />
      <>
        <label htmlFor="release_date">Título de la película</label>
        <input
          required
          type="text"
          name="title"
          placeholder="Ingresa el título"
          value={state.title || ""}
          onChange={handleInputChange}
          onInvalid={(e) =>
            e.target.setCustomValidity(
              "No olvides ingresar el título de la película"
            )
          }
        />
      </>
      <>
        <label htmlFor="release_date">Fecha de estreno</label>
        <CustomDateButton
          label="Selecciona la fecha de estreno"
          value={
            state.release_date
              ? parse(state.release_date, "dd/MM/yyyy", new Date())
              : null
          }
          onChange={(newValue) => {
            setState({
              ...state,
              release_date: format(newValue, "dd/MM/yyyy"),
            });
            release_ref.current.setCustomValidity("");
          }}
        />
        <input
          required
          style={{
            opacity: 0,
            zIndex: -1,
            height: "0px",
            margin: "-3px",
            padding: "0px",
          }}
          ref={release_ref}
          id="release_date"
          type="text"
          name="release_date"
          value={state.release_date}
          onChange={(e) => {
            console.log(e.target.value);
          }}
          onInvalid={(e) => {
            e.target.setCustomValidity(
              "No olvides seleccionar la fecha de estreno"
            );
          }}
        />
      </>
      <>
        <label htmlFor="gender">Género de la pelicula</label>
        <input
          type="text"
          name="gender"
          placeholder="Ingresa el género"
          value={state.gender || ""}
          onChange={handleInputChange}
        />
      </>
      <>
        <label htmlFor="gender">Imagen de portada</label>
        <label htmlFor="image" className="attach-button" style={{ margin: 0 }}>
          {state?.image ? (
            state.image.name
          ) : (
            <>
              <img className="icon" src={iconClip} alt="" /> Adjuntar
            </>
          )}
        </label>
        <input
          required
          id="image"
          type="file"
          accept=".jpg, .jpeg, .png"
          name="image"
          placeholder="Cargar portada*"
          onChange={handleFileChange}
          style={{
            opacity: 0,
            zIndex: -1,
            height: "0px",
            margin: "-3px",
            padding: "0px",
          }}
          onInvalid={(e) => {
            if (!state.image) {
              e.target.setCustomValidity(
                "No olvides seleccionar la imagen de portada"
              );
            }
          }}
        />
      </>
      <>
        <label htmlFor="category_id">Categoria de la pelicula</label>
        <select
          required
          name="category_id"
          id="category"
          className="attach-button"
          onChange={handleInputChange}
          value={state.category_id || 0}
          onInvalid={(e) =>
            e.target.setCustomValidity("No olvides seleccionar la categoria")
          }
        >
          <option value="0" disabled>
            Selecciona una categoria
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
          <option value="create">Crear nueva categoría</option>
        </select>
        {/* <a href="/add-category" className="add-category">
          Nueva categoria
        </a> */}
        <AddCategoryContainer
          open={state.category_id === "create"}
          setCategories={setCategories}
          selectCategory={(category) => {
            setState({ ...state, category_id: category });
          }}
          from="addMovie"
        />
      </>
      <>
        <label htmlFor="trailer">Link al trailer</label>
        <input
          type="url"
          name="trailer"
          placeholder="Ingresa la url del video"
          value={state.trailer || ""}
          onChange={handleInputChange}
        />
      </>
      <>
        <label htmlFor="summary">Resumen</label>
        <textarea
          id="summary"
          name="summary"
          value={state.summary || ""}
          onChange={handleInputChange}
        />
      </>
      <>
        <label>Galeria de Imagenes</label>
        <button
          className="attach-button"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
        >
          Agregar imagenes
        </button>
        <AddTrailerImages
          open={open}
          setOpen={setOpen}
          stateImages={stateImages}
          setStateImages={handleStateImages}
        />
      </>

      {children}

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
        <button
          className="solid"
          type="submit"
          style={{ marginTop: "25px", marginLeft: "15px" }}
        >
          Guardar
        </button>
        <button
          className="outline"
          type="button"
          style={{ marginTop: "25px", marginLeft: "15px" }}
          onClick={(e) => {
            e.preventDefault();
            setState(initialState);
          }}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default AddMovie;
