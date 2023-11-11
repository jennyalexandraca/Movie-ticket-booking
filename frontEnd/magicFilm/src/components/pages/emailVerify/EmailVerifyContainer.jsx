import React, { useState, useEffect, useContext } from "react";
import EmailVerifyPage from "./EmailVerify";

import noVigente from "../../../assets/images/image_11.svg";
import tick from "../../../assets/images/image_64.svg";
import equis from "../../../assets/images/image_66.svg";
import popCorn from "../../../assets/images/image_83.svg";
import robot from "../../../assets/images/image_85.svg";
import looking from "../../../assets/images/image_86.svg";
import alarm from "../../../assets/images/image_87.svg";

import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyUser, reenviarMail } from "../../../service/userServices";
import { AuthContext } from "../../../context/AuthContext";

const EmailVerifyContainer = () => {
  const { user } = useContext(AuthContext);
  if (user && user.id) {
    navigate("/", { replace: true });
  }
  const navigate = useNavigate();
  const [state, setState] = useState({});
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  // Ejemplo de acceso a un parámetro de búsqueda específico
  const status = searchParams.get("status");
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const handleResend = () => {
    console.log("Reenviar email", email);
    reenviarMail({ email: email })
      .then(({ data }) => {
        Swal.fire("Reenvio de email", data, "success");
      })
      .catch((error) => {
        Swal.fire(
          "Error reenviando el correo ",
          error?.response?.data,
          "error"
        );
      });
  };
  useEffect(() => {
    let stateData = {};

    if (status === "pending") {
      setState({
        statusImage: alarm,
        image: looking,
        title: "Aún te falta verificar tu cuenta de correo electrónico",
        subtitle:
          "Revisa el email que enviamos a tu correo para poder iniciar sesión. Si no lo recibiste o el link ya caducó, elige reenviar email.",
        resend: handleResend,
      });
    } else if (
      (token == null || token == "" || token == undefined) &&
      (email != null || email != "" || email != undefined)
    ) {
      setState({
        statusImage: equis,
        image: robot,
        title:
          "Ups! Sucedió un error al intentar verificar tu cuenta de correo electrónico ",
        subtitle:
          "Vuelve a dar clic en el email de confirmación que te enviamos, de lo contrario comunícate con nosotros. ",
      });
    } else {
      verifyUser({ token: token })
        .then(({ data }) => {
          console.log(
            "🚀 ~ file: EmailVerifyContainer.jsx:55 ~ .then ~ data:",
            data
          );
          if (data?.is_verified == true) {
            stateData = {
              statusImage: tick,
              image: popCorn,
              title: "¡Bien! Hemos verificado tu cuenta de correo electrónico",
              subtitle:
                "Ya puedes disfrutar de las mejores películas en el mejor cinema. ",
              redirect: {
                title: "Iniciar sesión",
                link: "/login",
              },
            };
            setState(stateData);
          } else {
            setState({
              statusImage: equis,
              image: robot,
              title:
                "Ups! Sucedió un error al intentar verificar tu cuenta de correo electrónico ",
              subtitle:
                "Vuelve a dar clic en el email de confirmación que te enviamos o intenta obtener el correo de verificación nuevamente.",
              resend: handleResend,
            });
          }
        })
        .catch((error) => {
          console.log(
            "🚀 ~ file: EmailVerifyContainer.jsx:82 ~ verifyUser ~ error:",
            error
          );
          if (error.response.data.includes("JWT expired")) {
            stateData = {
              statusImage: equis,
              image: noVigente,
              title: "Este link ya no está vigente",
              subtitle:
                "Estás intentando verificar tu correo con un link que ya caducó. Verifica tu cuenta de correo y disfruta de las mejores películas.",
              resend: handleResend,
            };
          } else {
            setState({
              statusImage: equis,
              image: robot,
              title:
                "Ups! Sucedió un error al intentar verificar tu cuenta de correo electrónico ",
              subtitle:
                "Vuelve a dar clic en el email de confirmación que te enviamos, de lo contrario comunícate con nosotros. ",
            });
          }

          setState(stateData);
        });
    }
  }, []);
  return <EmailVerifyPage state={state} />;
};

export default EmailVerifyContainer;
