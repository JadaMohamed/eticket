import React, { useContext, useState } from "react";
import "../../css/sign_up_client.css";
import Logo from "../../img/logo.svg";
import axios from "axios";
import AuthContext from "../../Auth/AuthContext";

const SignUpClient = ({ setTrigger, login }) => {
  const [visibility, setvisibility] = useState(false);
  const { profile, setProfile } = useContext(AuthContext);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [formData, setFormData] = useState({
    first_name: "test",
    last_name: "test",
    email: "test",
    city: "test",
    phone_number: "test",
    password: "test",
  });
  const createAccount = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/user/registerclient`,
        { formData },
        {
          withCredentials: true,
        }
      );
      setProfile(response.data.profile);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="sign-up-client">
      <div className="sign-up-client-container">
        <div
          className="close"
          onClick={() => {
            setTrigger(false);
          }}
        >
          <span class="material-symbols-outlined">close</span>
        </div>
        <div className="sign-up-content">
          <div className="header">
            <img src={Logo} alt="" />
          </div>
          <div className="title-login">
            <div className="title">Create new account</div>
            <div className="instrs">
              Already have an account?{" "}
              <span
                onClick={() => {
                  setTrigger(false);
                  login(true);
                }}
              >
                Login
              </span>
            </div>
          </div>
          <div className="personal-informations">
            <div className="row">
              <div className="labeled-input">
                <label>First name</label>
                <input type="text" placeholder="First name" />
              </div>
              <div className="labeled-input">
                <label>Last name</label>
                <input type="text" placeholder="Last name" />
              </div>
            </div>
            <div className="row">
              <div className="labeled-input">
                <label>Email</label>
                <div className="iconed-input">
                  <span class="material-symbols-outlined">email</span>
                  <input type="text" placeholder="Email" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="labeled-input">
                <label>City</label>
                <div className="iconed-input">
                  <span class="material-symbols-outlined">distance</span>
                  <input type="text" placeholder="City" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="labeled-input">
                <label>Phone</label>
                <div className="iconed-input">
                  <span class="material-symbols-outlined">call</span>
                  <input type="number" placeholder="Phone" />
                </div>
              </div>
            </div>
            <div className="row pass">
              <div className="labeled-input">
                <label>Password</label>
                <input
                  type={`${visibility ? "text" : "password"}`}
                  placeholder="Password"
                />
              </div>
              <span
                class="material-symbols-outlined"
                onClick={() => {
                  setvisibility(!visibility);
                }}
              >
                {visibility ? "visibility" : "visibility_off"}
              </span>
              <div className="labeled-input">
                <label>Confirm password</label>
                <input
                  type={`${visibility ? "text" : "password"}`}
                  placeholder="Confirm password"
                />
              </div>
            </div>
            <div
              className="btn"
              onClick={() => {
                createAccount();
              }}
            >
              <div className="btn-container">Sign Up</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpClient;
