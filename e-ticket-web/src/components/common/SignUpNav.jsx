import React, { useContext, useEffect, useRef, useState } from "react";
import logo from "../../img/logo.svg";
import "../../css/SignUpNav.css";
import AuthContext from "../../Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import organizer from "../../img/organizer.svg";

export default function SignUpNav(props) {
  const [isVisible, setVisible] = useState(false);
  const Nav = useNavigate();
  const toggleVisibility = () => {
    if (isVisible) setVisible(false);
    else setVisible(true);
  };

  return (
    <div className="signin-popup">
      <div className="signin-popup-container">
        <div className="logo">
          <img
            src={logo}
            alt="e-tickets.logo"
            className="Logo_"
            title="e-ticket.com"
          />
        </div>
        <div className="close" onClick={() => props.setTrigger(false)}>
          <span className="material-symbols-outlined">cancel</span>
        </div>
        <div className="title-instructions element">
          <div className="title">Sign Up</div>
          <div className="instructions">
            If you selected an account type, you can’t switch it to other.
          </div>
        </div>
        <div className="select-user-type">
          <div
            className="user-organizer user-type"
            onClick={() => {
              Nav("/registration", { replace: false });
            }}
          >
            {/* <img src={organizer} alt="" className="bg" /> */}
            <div className="user-type-title">Organizer</div>
            <div className="description">
              Lorem ipsum dolor rerum consequatur expedita corporis commodi
              explicabo repudiandae itaque.
            </div>
            <div className="arrow-icon">
              <span className="material-symbols-outlined">arrow_forward</span>
            </div>
          </div>
          <div
            className="user-buyer user-type"
            onClick={() => {
              props.signUpClient(true);
              props.setTrigger(false);
            }}
          >
            <div className="user-type-title">Buyer</div>
            <div className="description">
              Lorem ipsum dolor rerum consequatur expedita corporis commodi
              explicabo repudiandae itaque.
            </div>
            <div className="arrow-icon">
              <span className="material-symbols-outlined">arrow_forward</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
