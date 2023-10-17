import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import logo from "../../img/log-dark.svg";
import SignUpFlow from "./sub/SignupFlow";
import "./index.css";
import BasicInfos from "../../../components/signup/basicinfos";
import SecurityInfos from "../../../components/signup/securityinfos";
import BrandInfos from "../../../components/signup/brandinfos";
import axios from "axios";
import useMultiplePageForm from "../../../Utils/useMultiplePageForm.ts";
// import AuthContext from "../../../Auth/AuthContext";
// import Header from "../../../components/common/Header";
// import AuthContext from "../../Auth/AuthContext";

const SignUp = () => {
  // const { profile, setProfile } = useContext(AuthContext);
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [previewSource, setPreviewSource] = useState("");
  const [errorField, setErrorField] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    city: "",
    avatar: "",
    password: "",
    confirmPassword: "",
    phone_number: "",
    Description: "",
    Instagram: "",
    Facebook: "",
    Twitter: "",
  });

  const handleSubmit = async (event) => {
    setErrorField("");
    console.log("Signing UP.....");
    event.preventDefault();
    if (isLastStep) {
      if (!formData.Description) {
        setErrorField("Please enter your account description*");
        return;
      } else if (formData.Description.length < 12) {
        setErrorField("Please enter a valid description*");
        return;
      }
      uploadImage(previewSource)
        .then((result) => {
          console.log(result);
          formData.avatar = result;
          if (formData.avatar.length > 0) {
            createAccount(); // assign the result to a variable
          }
        })
        .catch((error) => {
          setErrorField(
            "Register *'canceled'* you can try again\n check also your net***"
          );
          console.error(error); // handle any errors that occur while handling the Promise objects
        });
    }
  };
  const uploadImage = async (base64EncodedImage) => {
    console.log(base64EncodedImage);
    try {
      const response = await fetch(`${apiUrl}/api/images/avatar/upload/`, {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-type": "application/json" },
      });
      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // useEffect(() => {
  //   if (profile?.account?.account_type === "organizer") {
  //     navigate("/organizer/dashboard");
  //   }
  // }, [profile, navigate]);

  const handleBackClick = () => {
    back();
    setErrorField("");
  };

  const validateFirstStep = () => {
    if (!formData.first_name) {
      setErrorField("Please enter your first name*");
      return false;
    }

    if (!formData.last_name) {
      setErrorField("Please enter your last name*");
      return false;
    }

    if (!formData.email) {
      setErrorField("Please enter your email*");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrorField("Please enter a valid email*");
      return false;
    }

    if (!formData.city) {
      setErrorField("Please enter your city*");
      return false;
    }
    if (previewSource === "") {
      setErrorField("Please choise profile photo*");
      return false;
    }
    return true;
  };

  const validateSecondStep = () => {
    if (!formData.password) {
      setErrorField("Please enter your password*");
      return false;
    } else if (formData.password.length < 8) {
      setErrorField("Password should be at least 8 characters*");
      return false;
    }

    if (!formData.confirmPassword) {
      setErrorField("Please confirm your password*");
      return false;
    } else if (formData.password !== formData.confirmPassword) {
      setErrorField("Passwords do not match*");
      return false;
    }

    if (!formData.phone_number) {
      setErrorField("Please enter your phone number*");
      return false;
    } else if (!/^\d{10}$/.test(formData.phone_number)) {
      setErrorField("Please enter a valid phone number*");
      return false;
    }

    return true;
  };
  const handleNextClick = () => {
    if (isFirstStep) {
      const isValid = validateFirstStep();
      if (isValid) {
        // proceed to the next step
        next();
        setErrorField("");
      }
    }

    if (!isFirstStep && !isLastStep) {
      const isValid = validateSecondStep();
      if (isValid) {
        // proceed to the next step
        next();
        setErrorField("");
      }
    }
  };
  const createAccount = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/user/registerorganizer`,
        formData,
        { withCredentials: true }
      );
      //   setProfile(response.data.profile);
      if (response.data) {
        navigate("/verify-email/checkemail");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultiplePageForm([
      <BasicInfos
        formData={formData}
        setFormData={setFormData}
        setPreviewSource={setPreviewSource}
        previewSource={previewSource}
      />,
      <SecurityInfos formData={formData} setFormData={setFormData} />,
      <BrandInfos formData={formData} setFormData={setFormData} />,
    ]);

  return (
    <>
      <div className="signup-container">
        <div className="signup-content">
          <div className="right-side">
            <div className="header-title">Create organizer account</div>
            <div className="instructions-signup"></div>
            <SignUpFlow activestep={`${currentStepIndex + 1}`} />
            <form onSubmit={handleSubmit}>
              <div className="form-container">
                <div className="top-form-container">{step}</div>
                <div className="errrror">{errorField}</div>
                <div className="bottom-form-container">
                  {!isFirstStep && (
                    <button
                      className="back"
                      type="button"
                      onClick={handleBackClick}
                    >
                      Back
                    </button>
                  )}
                  {!isLastStep && (
                    <button
                      className="next"
                      type="button"
                      onClick={handleNextClick}
                    >
                      Next
                    </button>
                  )}
                  {isLastStep && (
                    <button className="next" type="submit">
                      Sign Up
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
