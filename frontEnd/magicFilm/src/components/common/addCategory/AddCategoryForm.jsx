import { useState, forwardRef } from "react";
import "./addCategory.css";
import Swal from "sweetalert2";

const AddCategoryForm = forwardRef(({ saveCategory }, ref) => {
  const initialState = {
    title: "",
    description: "",
    logo: null,
    zoom: null,
  };
  const [state, setState] = useState(initialState);
  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result;
        setState({
          ...state,
          [event.target.name]: base64String,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!state.title || !state.description) {
      Swal.fire("Todos los campos son obligatorios", "", "error");
      return;
    }
    saveCategory(state);
  };

  return (
    <div className="form-box" ref={ref}>
      <form
        onSubmit={handleSubmit}
        className="formulario-add-category"
        style={{ marginBottom: "0" }}
      >
        <h2 className="title">Agregar Categoría</h2>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Categoría*"
          onChange={handleInputChange}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",

            gap: "1rem",
            flex: "1 1 auto",
            width: "100%",
          }}
        ></div>
        <input
          type="text"
          name="description"
          id="description"
          placeholder="Descripción"
          onChange={handleInputChange}
        />
        {/* <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flex: "1 1 auto",
              alignItems: "center",
              gap: "1rem",
              width: "100%",
            }}
          >
            {state?.zoom ? (
              <p style={{ fontSize: "0.9rem" }}></p>
            ) : (
              <p style={{ fontSize: "0.9rem" }}>
                Cargar imagen*{" "}
                <span style={{ fontSize: "0.7rem" }}>(JPEG, PNG)</span>
              </p>
            )}
            <label htmlFor="zoom" className="attach-button">
              <img className="icon" src={iconClip} alt="" />
              {state?.zoom ? "Cambiar" : "Adjuntar"}
            </label>
            <input
              id="zoom"
              type="file"
              accept=".jpg, .jpeg, .png"
              name="zoom"
              placeholder="Cargar portada"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flex: "1 1 auto",
              alignItems: "center",
              gap: "1rem",
              width: "100%",
            }}
          >
            {state?.logo ? (
              <p style={{ fontSize: "0.9rem" }}></p>
            ) : (
              <p style={{ fontSize: "0.9rem" }}>
                Cargar Logo*{" "}
                <span style={{ fontSize: "0.7rem" }}>(JPEG, PNG)</span>
              </p>
            )}
            <label htmlFor="logo" className="attach-button">
              <img className="icon" src={iconClip} alt="" />
              {state?.logo ? "Cambiar Logo" : "Adjuntar"}
            </label>
            <input
              id="logo"
              type="file"
              accept=".jpg, .jpeg, .png"
              name="logo"
              placeholder="Cargar portada"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div> */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flex: "1 1 auto",
            alignItems: "center",
            gap: "1rem",
            width: "100%",
          }}
        >
          <button
            style={{ marginLeft: "auto" }}
            className="solid"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Crear
          </button>
        </div>
      </form>
    </div>
  );
});

export default AddCategoryForm;
