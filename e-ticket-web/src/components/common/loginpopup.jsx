import React, { useContext, useEffect, useRef, useState } from "react";
import logo from "../../img/logo.svg";
import "../../css/loginpopup.css";
import AuthContext from "../../Auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPopup(props) {
  const [isVisible, setVisible] = useState(false);
  const userName = useRef("");
  const password = useRef("");
  const { login } = useContext(AuthContext);
  const Nav = useNavigate();

  const loginSubmit = async (event) => {
    event.preventDefault();
    let payload = {
      email: userName.current.value,
      password: password.current.value,
    };
    await login(payload);
    props.setTrigger(false);
  };

  const toggleVisibility = () => {
    if (isVisible) setVisible(false);
    else setVisible(true);
  };

  return (
    <div className="login-popup">
      <div className="login-popup-container">
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
          <div className="title">Sign In</div>
          <div className="instructions">
            Welcome back, Please enter your details.
          </div>
        </div>
        <div className="form element">
          <div className="element-c email">
            <label htmlFor="email">Email</label>
            <div className="login-input">
              <input
                className="form-input"
                type="email"
                id="email"
                ref={userName}
                required
              />
            </div>
          </div>
          <div className="element-c password">
            <label htmlFor="password">Password</label>
            <div className="login-input password-input">
              <span
                className="material-symbols-outlined"
                onClick={toggleVisibility}
              >
                {isVisible ? "visibility" : "visibility_off"}
              </span>
              <input
                className="form-input"
                type={isVisible ? "" : "password"}
                id="first-name"
                ref={password}
                required
              />
            </div>
            {/* <div className="forgot-password">Forgot Password</div> */}
          </div>
          <div className="element-c submit">
            {/* where is button */}
            <div className="submit-container" onClick={loginSubmit}>
              Sign In
            </div>
          </div>
          <div className="element-c sign-up">
            Don't have account?{" "}
            <span
              onClick={() => {
                Nav("/registration", { replace: false });
              }}
            >
              Sign Up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
