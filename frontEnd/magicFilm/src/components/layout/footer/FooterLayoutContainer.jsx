import React from "react";
import FooterLayout from "./FooterLayout";
import { Outlet } from "react-router-dom";

const FooterLayoutContainer = () => {
  return (
    <>
      <Outlet />
      <FooterLayout />
    </>
  );
};

export default FooterLayoutContainer;
