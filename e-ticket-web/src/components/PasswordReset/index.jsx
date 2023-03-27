import React, { useEffect, useState } from "react";
import "./style.css";
import logo from "./../../img/logo.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import rolling from "../../img/rolling.svg";
import Eror404 from "../common/eror404";
import Alert from "../common/alert";

function PasswordResetForm() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { eticketjwt } = useParams();
  const [validUrl, setValidUrl] = useState(true);
  const [emailSended, setemailSended] = useState(false);
  const [typeuser, setTypeuser] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const Nav = useNavigate();
  const [alertParams, setAlertParams] = useState({
    color: "",
    msg: "",
    icon: "",
  });
  useEffect(() => {
    const verifytoken = async () => {
      try {
        const url = `${apiUrl}/api/user/verifytoken/${eticketjwt}`;
        const { data } = await axios.get(url, { withCredentials: true });
        // console.log(data);
        if (data) {
          setValidUrl(true);
        }
      } catch (error) {
        setValidUrl(false);
        console.log(error);
      }
    };
    verifytoken();
  }, [eticketjwt]);

  const [email, setEmail] = useState("");
  const sendEmailResetPassword = async () => {
    setLoading(true);
    setMessage("");
    try {
      if (!email) {
        setAlert(true);
        setAlertParams({
          color: "red",
          msg: "Enter your email please to reset password",
          icon: "error",
        });
        setLoading(false);
        return;
      }
      const url = `${apiUrl}/api/user/reset-password-mail`;
      const { data } = await axios.post(
        url,
        { email },
        { withCredentials: true }
      );
      // console.log(data);
      if (data.msg) {
        setAlert(true);
        setAlertParams({ color: "green", msg: `${data.msg}`, icon: "check" });
        setemailSended(true);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    setMessage("");
    if (!password) {
      setLoading(false);
      setAlert(true);
      setAlertParams({
        color: "red",
        msg: "Type a new password",
        icon: "error",
      });
      return;
    } else if (password.trim().length < 8) {
      setAlert(true);
      setLoading(false);
      setAlertParams({
        color: "red",
        msg: "Password should containe at least 8 characters",
        icon: "error",
      });
      return;
    }
    if (password !== confirmPassword) {
      setAlert(true);
      setLoading(false);
      setAlertParams({
        color: "red",
        msg: "Passwords do not match",
        icon: "error",
      });
      return;
    }

    try {
      const url = `${apiUrl}/api/user/reset-password/${eticketjwt}`;
      const { data } = await axios.post(
        url,
        { password, confirmPassword },
        { withCredentials: true }
      );
      // console.log(data);
      if (data) {
        setAlert(true);
        setLoading(false);
        setAlertParams({
          color: "green",
          msg: "Password reset successful",
          icon: "check",
        });
        setTypeuser(data.userType);
      }
    } catch (error) {
      if (error.response.data) {
        setMessage(error.response.data.errors[0]);
      } else {
        console.log(error);
      }
    } // 2 second delay
  };
  useEffect(() => {
    setTimeout(() => {
      if (typeuser === "client") {
        Nav("/");
      } else if (typeuser === "organizer") {
        Nav("/organizer/dashboard");
      }
    }, 2000);
  }, [typeuser]);
  if (eticketjwt === "msg") {
    return (
      <>
        <nav className="nav">
          <div className="nav-container">
            <img src={logo} alt="e-tickets.logo" className="Logo_" />
          </div>
        </nav>
        <div className="rest-massword">
          <Alert
            color={alertParams.color}
            msg={alertParams.msg}
            icon={alertParams.icon}
            setAlert={setAlert}
            alert={alert}
          />
          <div className="rest-password-container">
            <div className="header">
              <div className="title">Forgot Password?</div>
              <div className="sub-title">
                No worries, we'll send you rest instructions
              </div>
            </div>
            <div className="form">
              <div className="input">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="warning">
                <div className="icon">
                  <i class="fa-solid fa-info"></i>
                </div>
                <div className="message">
                  Please make sure you entred a valide email, wich you signed up
                  with !
                </div>
              </div>
            </div>
            <div className="btns">
              <div className="btn" onClick={sendEmailResetPassword}>
                <div className="btn-container">
                  {loading ? (
                    <img src={rolling} style={{ width: "20px" }} />
                  ) : (
                    "Receive Email"
                  )}
                </div>
              </div>
              <div
                className="btn back"
                onClick={() => {
                  Nav("/home");
                }}
              >
                <div className="btn-container">Back to login</div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        {validUrl ? (
          <>
            <div className="password-reset-form">
              <nav className="nav">
                <div className="nav-container">
                  <img src={logo} alt="e-tickets.logo" className="Logo_" />
                </div>
              </nav>
              <div className="rest-massword">
                <Alert
                  color={alertParams.color}
                  msg={alertParams.msg}
                  icon={alertParams.icon}
                  setAlert={setAlert}
                  alert={alert}
                />
                <form className="rest-password-container">
                  <div className="header">
                    <div className="title">Password Reset</div>
                    <div className="sub-title">
                      Please type your new password
                    </div>
                  </div>
                  <div className="form">
                    <div className="input">
                      <label>Password</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                      />
                    </div>
                    <div className="input">
                      <label>Confirm password</label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(event) =>
                          setConfirmPassword(event.target.value)
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="btns">
                    <div className="btn" onClick={handleSubmit}>
                      <div className="btn-container">
                        {loading ? (
                          <img src={rolling} style={{ width: "20px" }} />
                        ) : (
                          "Reset Password"
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </>
        ) : (
          <Eror404 />
        )}
      </>
    );
  }
}

export default PasswordResetForm;
