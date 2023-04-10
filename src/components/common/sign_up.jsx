import React, { useContext, useState } from "react";
import "../../css/sign_up_client.css";
import Logo from "../../img/logo.svg";
import axios from "axios";
// import AuthContext from "../../Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import rolling from '../../img/rolling.svg';


const SignUpClient = ({ setTrigger, login, alert, setAlert, setAlertParams }) => {
  const [visibility, setvisibility] = useState(false);
  // const { setProfile } = useContext(AuthContext);
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();



  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [cityError, setCityError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [Errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
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
      setFirstNameError("is required");
      return false;
    } else {
      setFirstNameError("");
    }

    if (!formData.last_name) {
      setLastNameError(" is required");
      return false;
    } else {
      setLastNameError("");
    }

    if (!formData.email) {
      setEmailError(" is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setEmailError(" not valide");
      return false;
    } else {
      setEmailError("");
    }

    if (!formData.city) {
      setCityError(" is required");
      return false;
    } else {
      setCityError("");
    }

    if (!formData.phone_number) {
      setPhoneNumberError(" is required");
      return false;
    } else if (!/^\d{10}$/.test(formData.phone_number)) {
      setPhoneNumberError(" not valide");
      return false;
    } else {
      setPhoneNumberError("");
    }

    if (!formData.password) {
      setPasswordError(" is required");
      return false;
    } else if (formData.password.length < 8) {
      setPasswordError("At least 8 characters");
      return false;
    } else {
      setPasswordError("");
    }

    if (!formData.confirmPassword) {
      setConfirmPasswordError(" is required");
      return false;
    } else if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError("Not match");
      return false;
    } else {
      setConfirmPasswordError("");
    }
    return true;
  };

  const registerclient = async () => {
    setLoading(true);
    setErrors([])
    const isValid = validateFields();
    if (!isValid) {
      setLoading(false);
      console.log('not valide! ')
      return
    }

    try {
      const response = await axios.post(
        `${apiUrl}/api/user/registerclient`,
        formData,
        { withCredentials: true, }
      );
      // console.log(response)
      // localStorage.setItem(
      //   "usertype",
      //   response.data.profile.account.account_type
      // );
      // setProfile(response.data.profile);
      if (response.data) {
        setLoading(false);
        setTrigger(false);
        setAlertParams({ color: 'green', msg: `Verification Email has been sent to ${formData.email}`, icon: 'clock' })
        setAlert(true);
        // navigate("/verify-email/checkemail")
      }
      // if (response.data.profile)
      //   window.location.reload();
    } catch (error) {
      const errorData = error.response.data;
      if (errorData.errors) {
        setErrors(errorData.errors);
        setLoading(false);
      } else {
        console.error(error);
      }

    }
  };


  const handleFirstNameChange = (event) => {
    setFirstNameError('')
    setFormData({ ...formData, first_name: event.target.value });
  };

  const handleLastNameChange = (event) => {
    setLastNameError('')
    setFormData({ ...formData, last_name: event.target.value });
  };

  const handleEmailChange = (event) => {
    setEmailError('')
    setFormData({ ...formData, email: event.target.value });
  };

  const handleCityChange = (event) => {
    setCityError('')
    setFormData({ ...formData, city: event.target.value });
  };


  const handlePasswordChange = (event) => {
    setPasswordError("");
    setFormData({ ...formData, password: event.target.value });
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPasswordError("")
    setFormData({ ...formData, confirmPassword: event.target.value });
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumberError('')
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
          <span className="material-symbols-outlined">close</span>
        </div>
        <form className="sign-up-content" >
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
                <label>First name <span style={{ color: 'red', fontSize: '12px' }}>{firstNameError}</span></label>
                <input type="text"
                  value={formData.first_name}
                  style={firstNameError ? { border: "1px solid red" } : {}}
                  onChange={handleFirstNameChange}
                  placeholder="First name"
                />
              </div>
              <div className="labeled-input">
                <label>Last name<span style={{ color: 'red', fontSize: '12px' }}>{lastNameError}</span></label>
                <input type="text" value={formData.last_name}
                  onChange={handleLastNameChange}
                  style={lastNameError ? { border: "1px solid red" } : {}}
                  placeholder="Last name" />
              </div>
            </div>
            <div className="row">
              <div className="labeled-input">
                <label>Email<span style={{ color: 'red', fontSize: '12px' }}>{emailError}</span></label>
                <div className="iconed-input" style={emailError ? { border: "1px solid red" } : {}}>
                  <span className="material-symbols-outlined" >email</span>
                  <input type="text" placeholder="Email"
                    onChange={handleEmailChange}
                    value={formData.email} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="labeled-input">
                <label>City<span style={{ color: 'red', fontSize: '12px' }}>{cityError}</span></label>
                <div className="iconed-input" style={cityError ? { border: "1px solid red" } : {}}>
                  <span className="material-symbols-outlined">distance</span>
                  <input type="text" placeholder="City"
                    onChange={handleCityChange}
                    value={formData.city} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="labeled-input">
                <label>Phone<span style={{ color: 'red', fontSize: '12px' }}>{phoneNumberError}</span></label>
                <div className="iconed-input" style={phoneNumberError ? { border: "1px solid red" } : {}}>
                  <span className="material-symbols-outlined">call</span>
                  <input type="number" placeholder="Phone"
                    onChange={handlePhoneNumberChange}
                    value={formData.phone_number} />
                </div>
              </div>
            </div>
            <div className="row pass">
              <div className="labeled-input">
                <label>Password {passwordError !== '' && <span style={{ color: 'red', fontSize: '12px' }}>{passwordError}</span>}</label>
                <input
                  type={visibility ? "text" : "password"}
                  placeholder="Password"
                  style={passwordError ? { border: "1px solid red" } : {}}
                  value={formData.password}
                  onChange={handlePasswordChange}
                  role="presentation"
                />

              </div>
              <span
                className="material-symbols-outlined"
                onClick={() => {
                  setvisibility(!visibility);
                }}
              >
                {visibility ? "visibility" : "visibility_off"}
              </span>
              <div className="labeled-input">
                <label>Confirm password {confirmPasswordError !== '' && <span style={{ color: 'red', fontSize: '12px' }}>{confirmPasswordError}</span>}</label>
                <input
                  type={`${visibility ? "text" : "password"}`}
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  style={confirmPasswordError ? { border: "1px solid red" } : {}}
                  onChange={handleConfirmPasswordChange}
                  role="presentation"
                />
              </div>
            </div>
            <div
              className="btn"
              onClick={() => {
                registerclient();
              }}
            >
              <div style={{ color: 'red', marginBottom: '10px', fontSize: '12px' }}> {Errors[0]}</div>
              <div className="btn-container">{loading ? <img src={rolling} style={{ width: "20px" }} /> : 'Sign Up'}</div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpClient;
