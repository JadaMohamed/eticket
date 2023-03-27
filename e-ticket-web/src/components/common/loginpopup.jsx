import React, { useContext, useEffect, useRef, useState } from "react";
import logo from "../../img/logo.svg";
import "../../css/loginpopup.css";
import AuthContext from "../../Auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import rolling from '../../img/rolling.svg'

export default function LoginPopup(props) {
  const [isVisible, setVisible] = useState(false);
  const [loading, setLoading]=useState(false)
  const userName = useRef("");
  const password = useRef("");
  const { login, errorLogin, setErrorLogin } = useContext(AuthContext);
  const Nav = useNavigate();

  useEffect(() => {
    if (errorLogin === "Login successfully") {
      setErrorLogin("");
      props.setTrigger(false);
    }
  }, [errorLogin]);

  const loginSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    let payload = {
      email: userName.current.value,
      password: password.current.value,
    };
    await login(payload);
    // if(!errorLogin){
    //   props.setTrigger(false);
    // }
    setLoading(false);
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
          <span className="material-symbols-outlined">close</span>
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
                placeholder="Email"
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
                placeholder="Password"
              />
            </div>
            {/* <div className="forgot-password">Forgot Password</div> */}
          </div>
          <div className="element-c submit">
            {errorLogin && (
              <div style={{marginBottom: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', fontSize: '14px'}}>
                <span style={{ color: "red"}}> {errorLogin} </span>
                {/* <p>&nbsp;</p> */}
                <Link to="/reset-password/msg" style={{color: 'var(--Purple60)'}}>forget password?</Link>
              </div>
            )}
            <div className="submit-container" onClick={loginSubmit}>
            {loading? <img src={rolling} style={{width: "20px"}}/> : 'Sign Up'}
            </div>
          </div>
          <div className="element-c sign-up">
            Don't have account?{" "}
            <span
              onClick={() => {
                props.setTrigger(false);
                props.signup(true);
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
