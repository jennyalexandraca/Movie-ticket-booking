import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.scss";
import "boxicons/css/boxicons.min.css";

/* const Sidebar = () => {
  return (
    <div className='container-sidebar'>
        <h1>Panel <br/> administración</h1>
        <h3>Usuarios</h3>
        <Button size="medium">Usuarios</Button>
        <h3>Peliculas</h3>
        <Button size="medium">Agregar</Button>
        <Button size="medium">Actualizar</Button>
        <Button size="medium">Eliminar</Button>
        <h3>Categorías</h3>
        <Button size="medium">Agregar</Button>
        <Button size="medium">Actualizar</Button>
        <Button size="medium">Eliminar</Button>
    </div>
  )
}
 */
export const sidebarNavItems = [
  {
    display: "Home",
    icon: <i className="bx bx-home"></i>,
    to: "/",
    section: "",
  },
  {
    display: "Usuarios",
    icon: <i className="bx bx-user"></i>,
    to: "/addUser",
    section: "addUser",
  },
  {
    display: "Agregar Película",
    icon: <i className="bx bx-film"></i>,
    to: "/movie",
    section: "movie",

    /*  subNav: [
      {
        display: "Agregar",
        icon: <i className="bx bx-film"></i>,
        to: "/movie/new",
        section: "movie",
      },
      {
        display: "Eliminar",
        icon: <i className="bx bx-film"></i>,
        to: "/movie/delete",
        section: "movie",
      },
    ], */
  },
  {
    display: "Eliminar Película",
    icon: <i className="bx bx-film"></i>,
    to: "/delete",
    section: "delete",
  },
  {
    display: "Categorías",
    icon: <i className="bx bx-category"></i>,
    to: "/newcategory",
    section: "newcategory",
  },
];

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepHeight, setStepHeight] = useState(0);
  const sidebarRef = useRef();
  const indicatorRef = useRef();
  const location = useLocation();

  // useEffect(() => {
  //   setTimeout(() => {
  //     const sidebarItem = sidebarRef.current.querySelector(
  //       ".sidebar__menu__item"
  //     );
  //     indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
  //     setStepHeight(sidebarItem.clientHeight);
  //   }, 50);
  //   console.log(indicatorRef);
  // }, []);

  // change active index
  useEffect(() => {
    const curPath = window.location.pathname.split("/")[1];
    const activeItem = sidebarNavItems.findIndex(
      (item) => item.section === curPath
    );
    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);

  return (
    <div className="sidebar">
      <div className="sidebar__logo">Panel Admin</div>
      <div ref={sidebarRef} className="sidebar__menu">
        {sidebarNavItems.map((item, index) => (
          <Link to={item.to} key={index}>
            <div
              className={`sidebar__menu__item ${
                activeIndex === index ? "active" : ""
              }`}
            >
              <div className="sidebar__menu__item__icon">{item.icon}</div>
              <div className="sidebar__menu__item__text">{item.display}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
