import React, { useState } from "react";
import "./AddUser.css";
import { createUser } from "../../../service/userServices";
import { object, string, ref } from "yup";
import { Link } from "react-router-dom";
import imgMail from "../../../assets/icon/email.svg";

const AddUser = ({ state, setState }) => {
  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const validationSchema = object().shape({
    name: string()
      .required("El nombre es requerido")
      .test("no-numerico", "El nombre no puede contener números", (value) => {
        if (value) {
          const regex = /^[A-Za-z]+$/;
          return regex.test(value);
        }
        return true;
      }),
    surname: string()
      .required("El apellido es requerido")
      .test("no-numerico", "El apellido no puede contener números", (value) => {
        if (value) {
          const regex = /^[A-Za-z]+$/;
          return regex.test(value);
        }
        return true;
      }),
    email: string()
      .email("El email no es válido")
      .required("El email es requerido"),
    password: string().required("La contraseña es requerida"),
    repassword: string()
      .oneOf([ref("password"), null], "Las contraseñas no coinciden")
      .required("La confirmación de contraseña es requerida"),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await validationSchema.validate(state, { abortEarly: false });
      const { repassword, ...new_user } = state;

      const create = createUser(new_user);

      create
        .then((data) => {
          if (data.status === 201) {
            setShowPopup(true); // Mostrar ventana emergente
          }
        })
        .catch((error) => console.log(error));
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      setErrors(validationErrors);
      console.log(error);
    }
  };
  const handleReset = () => {
    setState({
      name: "",
      surname: "",
      email: "",
      password: "",
    });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="formulario-add-user">
      <h2 className="title">Crear Cuenta</h2>

      <div className={`form-group ${errors.name ? "error" : ""}`}>
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder=""
          value={state.name || ""}
          onChange={handleInputChange}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className={`form-group ${errors.surname ? "error" : ""}`}>
        <label htmlFor="surname">Apellido</label>
        <input
          type="text"
          id="surname"
          name="surname"
          placeholder=""
          value={state.surname || ""}
          onChange={handleInputChange}
        />
        {errors.surname && (
          <span className="error-message">{errors.surname}</span>
        )}
      </div>

      <div className={`form-group ${errors.email ? "error" : ""}`}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder=""
          value={state.email || ""}
          onChange={handleInputChange}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className={`form-group ${errors.password ? "error" : ""}`}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder=""
          value={state.password || ""}
          onChange={handleInputChange}
        />
        {errors.password && (
          <span className="error-message">{errors.password}</span>
        )}
      </div>

      <div className={`form-group ${errors.repassword ? "error" : ""}`}>
        <label htmlFor="repassword">Confirma Pasword</label>
        <input
          type="password"
          id="repassword"
          name="repassword"
          placeholder=""
          value={state.repassword || ""}
          onChange={handleInputChange}
        />
        {errors.repassword && (
          <span className="error-message">{errors.repassword}</span>
        )}
      </div>

      <button className="solid" type="submit">
        Crear
      </button>

      <div>
        {showPopup && (
          <div className="popup">
            <img src={imgMail} alt="" className="img-user-mail" />{" "}
            <h4>
              Te enviamos un email. Dale clic al enlace para confirmar la
              creación de tu cuenta.
            </h4>
            <Link to="/">
              <button
                className=" solid"
                onClick={() => {
                  setShowPopup(false);
                  handleReset();
                }}
              >
                Cerrar
              </button>
            </Link>
          </div>
        )}
      </div>
    </form>
  );
};

export default AddUser;
