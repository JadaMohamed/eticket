import React, { useState } from "react";
import "../../../../css/sign_up_client.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import rolling from "../../../../img/rolling.svg";

const BuyerSignUp = ({
  setTrigger,
  login,
  alert,
  setAlert,
  setAlertParams,
}) => {
  const [visibility, setvisibility] = useState(false);
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
    setErrors([]);
    const isValid = validateFields();
    if (!isValid) {
      setLoading(false);
      console.log("not valide! ");
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/api/user/registerclient`,
        formData,
        { withCredentials: true }
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
        setAlertParams({
          color: "green",
          msg: `Verification Email has been sent to ${formData.email}`,
          icon: "clock",
        });
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
    setFirstNameError("");
    setFormData({ ...formData, first_name: event.target.value });
  };

  const handleLastNameChange = (event) => {
    setLastNameError("");
    setFormData({ ...formData, last_name: event.target.value });
  };

  const handleEmailChange = (event) => {
    setEmailError("");
    setFormData({ ...formData, email: event.target.value });
  };

  const handleCityChange = (event) => {
    setCityError("");
    setFormData({ ...formData, city: event.target.value });
  };

  const handlePasswordChange = (event) => {
    setPasswordError("");
    setFormData({ ...formData, password: event.target.value });
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPasswordError("");
    setFormData({ ...formData, confirmPassword: event.target.value });
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumberError("");
    setFormData({ ...formData, phone_number: event.target.value });
  };

  return (
    <div className="h-screen fixed w-full bg-[rgba(0,0,0,0.2)] backdrop-blur-sm top-0 left-0 flex justify-center items-center select-none">
      <div className="relative m-5 p-8 w-full max-w-md bg-white rounded-lg flex gap-8 flex-col shadow-sm">
        <div
          className="absolute top-3 right-3 text-accent-300 select-none cursor-pointer p-1 leading-none flex text- rounded-full hover:bg-[#f9f9f9] duration-300"
          onClick={() => {
            setTrigger(false);
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 7L7 17M7 7L17 17"
              className="stroke-accent-300"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <form className="gap-3 flex flex-col">
          <div className="mb-3">
            <div className="text-2xl font-semibold text-primary-700">
              Register
            </div>
            <div className="text-accent-400 text-sm">
              Reserve your seat from home!
            </div>
          </div>
          <div className="flex justify-between gap-4 items-center">
            <div className="flex flex-col gap-1">
              <label className="text-accent-400 text-sm">
                First name{" "}
                <span style={{ color: "red", fontSize: "12px" }}>
                  {firstNameError}
                </span>
              </label>
              <div className="flex w-full border-accent-100 border rounded-lg overflow-hidden focus-within:outline outline-primary-400">
                <span className="p-[10px]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 20C5.33579 17.5226 8.50702 16 12 16C15.493 16 18.6642 17.5226 21 20M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
                      className="stroke-accent-400"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <input
                  className="outline-none bg-transparen w-full px-2 placeholder:text-accent-200 font-medium text-[15px] text-accent-800"
                  type="text"
                  value={formData.first_name}
                  style={firstNameError ? { border: "1px solid red" } : {}}
                  onChange={handleFirstNameChange}
                  placeholder="First name"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-accent-400 text-sm">
                Last name
                <span style={{ color: "red", fontSize: "12px" }}>
                  {lastNameError}
                </span>
              </label>
              <div className="flex w-full border-accent-100 border rounded-lg overflow-hidden focus-within:outline outline-primary-400">
                <span className="p-[10px]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 20C5.33579 17.5226 8.50702 16 12 16C15.493 16 18.6642 17.5226 21 20M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
                      className="stroke-accent-400"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <input
                  className="outline-none bg-transparen w-full px-2 placeholder:text-accent-200 font-medium text-[15px] text-accent-800"
                  type="text"
                  value={formData.last_name}
                  onChange={handleLastNameChange}
                  style={lastNameError ? { border: "1px solid red" } : {}}
                  placeholder="Last name"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="flex flex-col gap-1">
              <label className="text-accent-400 text-sm">
                Email
                <span style={{ color: "red", fontSize: "12px" }}>
                  {emailError}
                </span>
              </label>
              <div
                className="flex w-full border-accent-100 border rounded-lg overflow-hidden focus-within:outline outline-primary-400"
                style={emailError ? { border: "1px solid red" } : {}}
              >
                <span className="p-[10px]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.5 12H5.88197C6.56717 12 7.19357 12.3871 7.5 13C7.80643 13.6129 8.43283 14 9.11803 14H14.882C15.5672 14 16.1936 13.6129 16.5 13C16.8064 12.3871 17.4328 12 18.118 12H21.5M8.96656 4H15.0334C16.1103 4 16.6487 4 17.1241 4.16396C17.5445 4.30896 17.9274 4.5456 18.2451 4.85675C18.6043 5.2086 18.8451 5.6902 19.3267 6.65337L21.4932 10.9865C21.6822 11.3645 21.7767 11.5535 21.8434 11.7515C21.9026 11.9275 21.9453 12.1085 21.971 12.2923C22 12.4992 22 12.7105 22 13.1331V15.2C22 16.8802 22 17.7202 21.673 18.362C21.3854 18.9265 20.9265 19.3854 20.362 19.673C19.7202 20 18.8802 20 17.2 20H6.8C5.11984 20 4.27976 20 3.63803 19.673C3.07354 19.3854 2.6146 18.9265 2.32698 18.362C2 17.7202 2 16.8802 2 15.2V13.1331C2 12.7105 2 12.4992 2.02897 12.2923C2.05471 12.1085 2.09744 11.9275 2.15662 11.7515C2.22326 11.5535 2.31776 11.3645 2.50675 10.9865L4.67331 6.65337C5.1549 5.69019 5.3957 5.2086 5.75495 4.85675C6.07263 4.5456 6.45551 4.30896 6.87589 4.16396C7.35125 4 7.88969 4 8.96656 4Z"
                      className="stroke-accent-400"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <input
                  className="outline-none bg-transparen w-full px-2 placeholder:text-accent-200 font-medium text-[15px] text-accent-800"
                  type="text"
                  placeholder="Email"
                  onChange={handleEmailChange}
                  value={formData.email}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="flex flex-col gap-1">
              <label className="text-accent-400 text-sm">
                City
                <span style={{ color: "red", fontSize: "12px" }}>
                  {cityError}
                </span>
              </label>
              <div
                className="flex w-full border-accent-100 border rounded-lg overflow-hidden focus-within:outline outline-primary-400"
                style={cityError ? { border: "1px solid red" } : {}}
              >
                <span className="p-[10px]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 2.4578C14.053 2.16035 13.0452 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 10.2847 21.5681 8.67022 20.8071 7.25945M17 5.75H17.005M10.5001 21.8883L10.5002 19.6849C10.5002 19.5656 10.5429 19.4502 10.6205 19.3596L13.1063 16.4594C13.3106 16.2211 13.2473 15.8556 12.9748 15.6999L10.1185 14.0677C10.0409 14.0234 9.97663 13.9591 9.93234 13.8814L8.07046 10.6186C7.97356 10.4488 7.78657 10.3511 7.59183 10.3684L2.06418 10.8607M21 6C21 8.20914 19 10 17 12C15 10 13 8.20914 13 6C13 3.79086 14.7909 2 17 2C19.2091 2 21 3.79086 21 6ZM17.25 5.75C17.25 5.88807 17.1381 6 17 6C16.8619 6 16.75 5.88807 16.75 5.75C16.75 5.61193 16.8619 5.5 17 5.5C17.1381 5.5 17.25 5.61193 17.25 5.75Z"
                      className="stroke-accent-400"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <input
                  className="outline-none bg-transparen w-full px-2 placeholder:text-accent-200 font-medium text-[15px] text-accent-800"
                  type="text"
                  placeholder="City"
                  onChange={handleCityChange}
                  value={formData.city}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="flex flex-col gap-1">
              <label className="text-accent-400 text-sm">
                Phone
                <span style={{ color: "red", fontSize: "12px" }}>
                  {phoneNumberError}
                </span>
              </label>
              <div
                className="flex w-full border-accent-100 border rounded-lg overflow-hidden focus-within:outline outline-primary-400"
                style={phoneNumberError ? { border: "1px solid red" } : {}}
              >
                <span className="p-[10px]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.38028 8.85335C9.07627 10.303 10.0251 11.6616 11.2266 12.8632C12.4282 14.0648 13.7869 15.0136 15.2365 15.7096C15.3612 15.7694 15.4235 15.7994 15.5024 15.8224C15.7828 15.9041 16.127 15.8454 16.3644 15.6754C16.4313 15.6275 16.4884 15.5704 16.6027 15.4561C16.9523 15.1064 17.1271 14.9316 17.3029 14.8174C17.9658 14.3864 18.8204 14.3864 19.4833 14.8174C19.6591 14.9316 19.8339 15.1064 20.1835 15.4561L20.3783 15.6509C20.9098 16.1824 21.1755 16.4481 21.3198 16.7335C21.6069 17.301 21.6069 17.9713 21.3198 18.5389C21.1755 18.8242 20.9098 19.09 20.3783 19.6214L20.2207 19.779C19.6911 20.3087 19.4263 20.5735 19.0662 20.7757C18.6667 21.0001 18.0462 21.1615 17.588 21.1601C17.1751 21.1589 16.8928 21.0788 16.3284 20.9186C13.295 20.0576 10.4326 18.4332 8.04466 16.0452C5.65668 13.6572 4.03221 10.7948 3.17124 7.76144C3.01103 7.19699 2.93092 6.91477 2.9297 6.50182C2.92833 6.0436 3.08969 5.42311 3.31411 5.0236C3.51636 4.66357 3.78117 4.39876 4.3108 3.86913L4.46843 3.7115C4.99987 3.18006 5.2656 2.91433 5.55098 2.76999C6.11854 2.48292 6.7888 2.48292 7.35636 2.76999C7.64174 2.91433 7.90747 3.18006 8.43891 3.7115L8.63378 3.90637C8.98338 4.25597 9.15819 4.43078 9.27247 4.60655C9.70347 5.26945 9.70347 6.12403 9.27247 6.78692C9.15819 6.96269 8.98338 7.1375 8.63378 7.4871C8.51947 7.60142 8.46231 7.65857 8.41447 7.72538C8.24446 7.96281 8.18576 8.30707 8.26748 8.58743C8.29048 8.66632 8.32041 8.72866 8.38028 8.85335Z"
                      className="stroke-accent-400"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <input
                  className="outline-none bg-transparen w-full px-2 placeholder:text-accent-200 font-medium text-[15px] text-accent-800"
                  type="number"
                  placeholder="Phone"
                  onChange={handlePhoneNumberChange}
                  value={formData.phone_number}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-3 items-end">
            <div className="flex flex-col gap-1">
              <label className="text-accent-400 text-sm">
                Password{" "}
                {passwordError !== "" && (
                  <span style={{ color: "red", fontSize: "12px" }}>
                    {passwordError}
                  </span>
                )}
              </label>
              <div className="flex w-full border-accent-100 border rounded-lg overflow-hidden focus-within:outline outline-primary-400">
                <span className="p-[10px]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 10V8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8V10M12 14.5V16.5M8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C17.7202 10 16.8802 10 15.2 10H8.8C7.11984 10 6.27976 10 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21Z"
                      className="stroke-accent-400"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <input
                  className="outline-none bg-transparen w-full px-2 placeholder:text-accent-200 font-medium text-[15px] text-accent-800"
                  type={visibility ? "text" : "password"}
                  placeholder="**********"
                  style={passwordError ? { border: "1px solid red" } : {}}
                  value={formData.password}
                  onChange={handlePasswordChange}
                  role="presentation"
                />
              </div>
            </div>
            <span
              className="mb-3 cursor-pointer"
              onClick={() => {
                setvisibility(!visibility);
              }}
            >
              {visibility ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.42012 12.7132C2.28394 12.4975 2.21584 12.3897 2.17772 12.2234C2.14909 12.0985 2.14909 11.9015 2.17772 11.7766C2.21584 11.6103 2.28394 11.5025 2.42012 11.2868C3.54553 9.50484 6.8954 5 12.0004 5C17.1054 5 20.4553 9.50484 21.5807 11.2868C21.7169 11.5025 21.785 11.6103 21.8231 11.7766C21.8517 11.9015 21.8517 12.0985 21.8231 12.2234C21.785 12.3897 21.7169 12.4975 21.5807 12.7132C20.4553 14.4952 17.1054 19 12.0004 19C6.8954 19 3.54553 14.4952 2.42012 12.7132Z"
                    className="stroke-accent-600"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.0004 15C13.6573 15 15.0004 13.6569 15.0004 12C15.0004 10.3431 13.6573 9 12.0004 9C10.3435 9 9.0004 10.3431 9.0004 12C9.0004 13.6569 10.3435 15 12.0004 15Z"
                    className="stroke-accent-600"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.7429 5.09232C11.1494 5.03223 11.5686 5 12.0004 5C17.1054 5 20.4553 9.50484 21.5807 11.2868C21.7169 11.5025 21.785 11.6103 21.8231 11.7767C21.8518 11.9016 21.8517 12.0987 21.8231 12.2236C21.7849 12.3899 21.7164 12.4985 21.5792 12.7156C21.2793 13.1901 20.8222 13.8571 20.2165 14.5805M6.72432 6.71504C4.56225 8.1817 3.09445 10.2194 2.42111 11.2853C2.28428 11.5019 2.21587 11.6102 2.17774 11.7765C2.1491 11.9014 2.14909 12.0984 2.17771 12.2234C2.21583 12.3897 2.28393 12.4975 2.42013 12.7132C3.54554 14.4952 6.89541 19 12.0004 19C14.0588 19 15.8319 18.2676 17.2888 17.2766M3.00042 3L21.0004 21M9.8791 9.87868C9.3362 10.4216 9.00042 11.1716 9.00042 12C9.00042 13.6569 10.3436 15 12.0004 15C12.8288 15 13.5788 14.6642 14.1217 14.1213"
                    className="stroke-accent-600"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            <div className="flex flex-col gap-1">
              <label className="text-accent-400 text-sm">
                Confirm password{" "}
                {confirmPasswordError !== "" && (
                  <span style={{ color: "red", fontSize: "12px" }}>
                    {confirmPasswordError}
                  </span>
                )}
              </label>
              <div className="flex w-full border-accent-100 border rounded-lg overflow-hidden focus-within:outline outline-primary-400">
                <span className="p-[10px]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 10V8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8V10M12 14.5V16.5M8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C17.7202 10 16.8802 10 15.2 10H8.8C7.11984 10 6.27976 10 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21Z"
                      className="stroke-accent-400"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <input
                  className="outline-none bg-transparen w-full px-2 placeholder:text-accent-200 font-medium text-[15px] text-accent-800"
                  type={`${visibility ? "text" : "password"}`}
                  placeholder="**********"
                  value={formData.confirmPassword}
                  style={
                    confirmPasswordError ? { border: "1px solid red" } : {}
                  }
                  onChange={handleConfirmPasswordChange}
                  role="presentation"
                />
              </div>
            </div>
          </div>
          <div
            className="btn"
            onClick={() => {
              registerclient();
            }}
          >
            <div
              style={{ color: "red", marginBottom: "10px", fontSize: "12px" }}
            >
              {Errors[0]}
            </div>
            <div className="bg-secondary-600 min-h-[36px] flex justify-center items-center text-white font-medium rounded-lg cursor-pointer">
              {loading ? (
                <img src={rolling} style={{ width: "20px" }} />
              ) : (
                "Sign Up"
              )}
            </div>
          </div>
          <div className="text-xs font-medium text-center text-accent-600">
            Already have an account ?{" "}
            <span
              className="text-primary-600 underline cursor-pointer"
              onClick={() => {
                setTrigger(false);
                login(true);
              }}
            >
              Login
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuyerSignUp;
