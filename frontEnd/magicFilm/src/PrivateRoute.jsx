import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

const PrivateRoutes = () => {
  const { user } = useContext(AuthContext);
  if (user.rol != "ADMIN") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
