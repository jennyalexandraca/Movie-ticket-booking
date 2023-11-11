import React from "react";
import iconInstagram from "../../../assets/icon/instagram.svg";
import iconFacebook from "../../../assets/icon/facebook.svg";
import iconTwitter from "../../../assets/icon/twitter.svg";
import iconWhatsapp from "../../../assets/icon/whatsapp.svg";
import "./FooterLayout.css";

const FooterLayout = () => {
  return (
    <>
      <footer className="container-footer">
        <div className="boxSpanFooter">
          <span className="copyright">© 2023 Magic Film</span>
        </div>
        <div className="container-icon">
          <a href="https://www.instagram.com/" target="_blank">
            {" "}
            <img className="icon" src={iconInstagram} alt="" />{" "}
          </a>
          <a href="https://www.facebook.com/" target="_blank">
            <img className="icon" src={iconFacebook} alt="" />
          </a>
          <a href="https://twitter.com/home" target="_blank">
            <img className="icon" src={iconTwitter} alt="" />
          </a>
          <a href="https://web.whatsapp.com/" target="_blank">
            <img className="icon" src={iconWhatsapp} alt="" />
          </a>
        </div>
      </footer>
    </>
  );
};

export default FooterLayout;
