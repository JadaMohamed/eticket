import React from "react";
import logo from "../../img/log-dark.svg";

import "../../css/Footer.css";
const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-top">
          <div className="platforme-infos">
            <div className="logo">
              <img src={logo} alt="" />
            </div>
            <div className="discreption">
              Lorem ipsum dolor sit amet consectetur amet consectetur.
            </div>
            <div className="social-media">
              <div className="facebook sm">
                <i className="fa-brands fa-facebook-f"></i>
              </div>
              <div classNameName="instagram sm">
                <i className="fa-brands fa-instagram"></i>
              </div>
              <div className="twitter sm">
                <i className="fa-brands fa-twitter"></i>
              </div>
            </div>
          </div>
          <div className="platforme-navigation">
            <div className="navigator">
              <div className="title-navigator">Navigate</div>
              <div className="links">
                <span>Home</span>
                <span>Cart</span>
                <span>My tickets</span>
              </div>
            </div>
            <div className="navigator">
              <div className="title-navigator">Events categories</div>
              <div className="links">
                <span>Festival | Concert</span>
                <span>Family</span>
                <span>Theater | Cinema</span>
                <span>Sport</span>
                <span>Course | Lecture</span>
              </div>
            </div>
            <div className="navigator">
              <div className="title-navigator">Authenticate</div>
              <div className="links">
                <span>Login</span>
                <span>Sign Up</span>
                <span>Become Organizer</span>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="copy-right">© E-ticket.com. All rights reserved.</div>
          <div className="much-organized-events">2 387 organized event ;)</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
