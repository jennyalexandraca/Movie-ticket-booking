import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import HeaderLayout from "./HeaderLayout";
import { AuthContext } from "../../../context/AuthContext";

const HeaderLayoutContainer = () => {
  const { dispatch, dispatchActions, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch({ type: dispatchActions.logout });
    navigate("/");
  };
  return (
    <>
      <HeaderLayout logout={handleLogout} user={user} />
      <Outlet />
    </>
  );
};

export default HeaderLayoutContainer;
