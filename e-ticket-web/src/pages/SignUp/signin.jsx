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

const SignUp = () => {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    description: "",
    instagram: "",
    facebook: "",
    twitter: ""
  });

  useEffect(() => {
    console.log('000000000000000000000000000000');
    console.log(formData)
   
  }, [formData])
  

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
            <form action="">
              <div className="form-container">
                <div className="top-form-container">{step}</div>
                <div className="bottom-form-container">
                  {!isFirstStep && (
                    <button className="back" type="button" onClick={back}>
                      Back
                    </button>
                  )}
                  <button className="next" type="button" onClick={next}>
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
