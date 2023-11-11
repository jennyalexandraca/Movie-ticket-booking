import React from "react";
import "./login.css";

const LoginPage = ({ handleLogin }) => {
  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form" autoComplete="off">
        <h2 className="login-title">Iniciar sesión</h2>
        <label htmlFor="email">Correo Electrónico</label>
        <input id="email" required type="email" className="login-input" />
        <label htmlFor="password">Contraseña</label>
        <input id="password" required type="password" className="login-input" />
        <a href="/forgot-password" className="link">
          ¿Olvidaste tu contraseña?
        </a>
        <button type="submit" className="login-button">
          Iniciar sesión
        </button>
        <p className="register-link">
          ¿No tienes cuenta?
          <br />
          <a href="/register" className="link">
            Regístrate
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
