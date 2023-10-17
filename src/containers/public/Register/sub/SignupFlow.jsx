import React from "react";
import "./SignupFlow.css";

const SignUpFlow = (props) => {
  return (
    <div className="signup-flow ">
      <div className="signup-flow-container">
        <div className={`step ${props.activestep === "1" ? "active" : ""}`}>
          <div className="number">
            <span>1</span>
          </div>
          <div className="named">
            Basic <br></br>Informations
          </div>
        </div>
        <span className="material-symbols-outlined">chevron_right</span>
        <div className={`step ${props.activestep === "2" ? "active" : ""}`}>
          <div className="number">
            <span>2</span>
          </div>
          <div className="named">
            Security <br></br>Informations
          </div>
        </div>
        <span className="material-symbols-outlined">chevron_right</span>
        <div className={`step ${props.activestep === "3" ? "active" : ""}`}>
          <div className="number">
            <span>3</span>
          </div>
          <div className="named">
            Brand <br></br>Informations
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpFlow;
