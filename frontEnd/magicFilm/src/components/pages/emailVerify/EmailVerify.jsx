import React from "react";
import { Link } from "react-router-dom";
import "./emailVerify.css";

const EmailVerifyPage = ({ state }) => {
  return (
    <div className="email-verify-container">
      <div className="email-verify-info">
        <img src={state.statusImage} />
        <h1>{state.title}</h1>
        <p>{state.subtitle}</p>
        <div className="email-verify-buttons">
          <Link className="return" to="/">
            Volver al inicio
          </Link>
          {state?.redirect && (
            <Link className="redirect" to={state.redirect.link}>
              {state.redirect.title}
            </Link>
          )}
          {state?.resend && (
            <button type="button" className="resend" onClick={state.resend}>
              Reenviar Email
            </button>
          )}
        </div>
      </div>
      {state?.image && <img width="40%" src={state?.image} />}
    </div>
  );
};

export default EmailVerifyPage;
