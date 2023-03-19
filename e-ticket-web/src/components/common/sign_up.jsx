import React, { useContext, useState } from "react";
import "../../css/sign_up_client.css";
import Logo from "../../img/logo.svg";
import axios from "axios";
import AuthContext from "../../Auth/AuthContext";

const SignUpClient = ({ setTrigger, login }) => {
  const [visibility, setvisibility] = useState(false);
  const { setProfile } = useContext(AuthContext);
  const apiUrl = process.env.REACT_APP_API_URL;


  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [cityError, setCityError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [Errors, setErrors] = useState([]);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    city: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
  });
  const validateFields = () => {
    if (!formData.first_name) {
      setFirstNameError("is required*");
      return false;
    } else {
      setFirstNameError("");
    }

    if (!formData.last_name) {
      setLastNameError(" is required*");
      return false;
    } else {
      setLastNameError("");
    }

    if (!formData.email) {
      setEmailError(" is required*");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setEmailError(" not valide*");
      return false;
    } else {
      setEmailError("");
    }

    if (!formData.city) {
      setCityError(" is required*");
      return false;
    } else {
      setCityError("");
    }

    if (!formData.phone_number) {
      setPhoneNumberError(" is required*");
      return false;
    } else if (!/^\d{10}$/.test(formData.phone_number)) {
      setPhoneNumberError(" not valide");
      return false;
    } else {
      setPhoneNumberError("");
    }

    if (!formData.password) {
      setPasswordError(" is required*");
      return false;
    } else if (formData.password.length < 8) {
      setPasswordError(" at least 8 characters*");
      return false;
    } else {
      setPasswordError("");
    }

    if (!formData.confirmPassword) {
      setConfirmPasswordError(" is required*");
      return false;
    } else if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError(" not match*");
      return false;
    } else {
      setConfirmPasswordError("");
    }
    return true;
  };

  const registerclient = async () => {
    setErrors([])
    const isValid = validateFields();
    if (!isValid) {
      return
    }

    try {
      const response = await axios.post(
        `${apiUrl}/api/user/registerclient`,
        formData,
        { withCredentials: true, }
      );
      console.log(response)
      localStorage.setItem(
        "usertype",
        response.data.profile.account.account_type
      );
      setProfile(response.data.profile);
      setTrigger(false);
      if (response.data.profile)
        window.location.reload();
    } catch (error) {
      const errorData = error.response.data;
      if (errorData.errors) {
        setErrors(errorData.errors);
      } else {
        console.error(error);
      }

    }
  };


  const handleFirstNameChange = (event) => {
    setFormData({ ...formData, first_name: event.target.value });
  };

  const handleLastNameChange = (event) => {
    setFormData({ ...formData, last_name: event.target.value });
  };

  const handleEmailChange = (event) => {
    setFormData({ ...formData, email: event.target.value });
  };

  const handleCityChange = (event) => {
    setFormData({ ...formData, city: event.target.value });
  };


  const handlePasswordChange = (event) => {
    setFormData({ ...formData, password: event.target.value });
  };

  const handleConfirmPasswordChange = (event) => {
    setFormData({ ...formData, confirmPassword: event.target.value });
  };

  const handlePhoneNumberChange = (event) => {
    setFormData({ ...formData, phone_number: event.target.value });
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
                <label>First name <span style={{ color: 'red' }}>{firstNameError}</span></label>
                <input type="text"
                  value={formData.first_name}
                  onChange={handleFirstNameChange}
                  placeholder="First name" />
              </div>
              <div className="labeled-input">
                <label>Last name<span style={{ color: 'red' }}>{lastNameError}</span></label>
                <input type="text" value={formData.last_name}
                  onChange={handleLastNameChange}
                  placeholder="Last name" />
              </div>
            </div>
            <div className="row">
              <div className="labeled-input">
                <label>Email<span style={{ color: 'red' }}>{emailError}</span></label>
                <div className="iconed-input">
                  <span class="material-symbols-outlined" >email</span>
                  <input type="text" placeholder="Email"
                    onChange={handleEmailChange}
                    value={formData.email} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="labeled-input">
                <label>City<span style={{ color: 'red' }}>{cityError}</span></label>
                <div className="iconed-input">
                  <span class="material-symbols-outlined">distance</span>
                  <input type="text" placeholder="City"
                    onChange={handleCityChange}
                    value={formData.city} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="labeled-input">
                <label>Phone<span style={{ color: 'red' }}>{phoneNumberError}</span></label>
                <div className="iconed-input">
                  <span class="material-symbols-outlined">call</span>
                  <input type="number" placeholder="Phone"
                    onChange={handlePhoneNumberChange}
                    value={formData.phone_number} />
                </div>
              </div>
            </div>
            <div className="row pass">
              <div className="labeled-input">
                <label>Password<span style={{ color: 'red' }}>{passwordError}</span></label>
                <input
                  type={`${visibility ? "text" : "password"}`}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handlePasswordChange}
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
                <label>Confirm password<span style={{ color: 'red' }}>{confirmPasswordError}</span></label>
                <input
                  type={`${visibility ? "text" : "password"}`}
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleConfirmPasswordChange}

                />
              </div>
            </div>
            <div
              className="btn"
              onClick={() => {
                registerclient();
              }}
            >
              <div style={{ color: 'red' }}> {Errors[0]}</div>
              <div className="btn-container">Sign Up</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpClient;
