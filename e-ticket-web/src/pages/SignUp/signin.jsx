import React, { useEffect, useState } from "react";
import Navbar from "../../components/common/navbar";
import SubNavbar from "../../components/common/subnavbar";
import logo from "../../img/log-dark.svg";
import SignUpFlow from "./signupflow";
import "./signin.css";
import BasicInfos from "../../components/signup/basicinfos";
import SecurityInfos from "../../components/signup/securityinfos";
import BrandInfos from "../../components/signup/brandinfos";
import useMultiplePageForm from "../../organizer/components/useMultiplePageForm.ts";
import axios from "axios";

const SignUp = () => {

  const apiUrl = process.env.REACT_APP_API_URL;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone_number: "",
    Description: "",
    Instagram: "",
    Facebook: "",
    Twitter: ""
  });

  useEffect(() => {
    console.log('000000000000000000000000000000');
    console.log(formData)

  }, [formData])

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLastStep) {
      if (isSubmitting) {
        try {
          const response = await axios.post(`${apiUrl}/api/user/registerorganizer`, formData, { withCredentials: true });
          console.log(response.data);
          // Handle success case here
        } catch (error) {
          console.error(error);
          // Handle error case here
        }
      } else {
        //this is to avoid sending data imadiatly when click the Next and navigate to the LastStep
        console.log('ready to send')
        setIsSubmitting(true)
      }
    }
  };

  const handleBackClick = () => {
    setIsSubmitting(false);
    back();
  }


  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultiplePageForm([
      <BasicInfos formData={formData} setFormData={setFormData} />,
      <SecurityInfos formData={formData} setFormData={setFormData} />,
      <BrandInfos formData={formData} setFormData={setFormData} />,
    ]);

  return (
    <>
      <Navbar />
      <SubNavbar />
      <div className="signup-container">
        <div className="signup-content">
          <div className="left-side">
            <div className="logo">
              <img src={logo} alt="" />
            </div>
          </div>
          <div className="right-side">
            <div className="header-title">Create organizer account</div>
            <div className="instructions-signup">
              Already a member? <span>Login</span>
            </div>
            <SignUpFlow activestep={`${currentStepIndex + 1}`} />
            <form onSubmit={handleSubmit} >
              <div className="form-container">
                <div className="top-form-container">{step}</div>
                <div className="bottom-form-container">
                  {!isFirstStep && (
                    <button className="back" type="button" onClick={handleBackClick}>
                      Back
                    </button>
                  )}
                  <button className="next" type="submit" onClick={next}>
                    {isLastStep ? "Sign Up " : "Next"}
                  </button>
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
