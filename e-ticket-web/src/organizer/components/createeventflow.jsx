import React from "react";
import "../css/createeventflow.css";

function Createeventflow(props) {
  return (
    <div className="create-event-flow">
      <div className="create-event-flow-container">
        <div
          className={`step ${props.activestep === "1" ? "active-step" : ""}`}
        >
          <div className="number">
            <span>1</span>
          </div>
          <div className="named">Overview</div>
        </div>
        <span class="material-symbols-outlined">chevron_right</span>
        <div
          className={`step ${props.activestep === "2" ? "active-step" : ""}`}
        >
          <div className="number">
            <span>2</span>
          </div>
          <div className="named">Pricing</div>
        </div>
        <span class="material-symbols-outlined">chevron_right</span>
        <div
          className={`step ${props.activestep === "3" ? "active-step" : ""}`}
        >
          <div className="number">
            <span>3</span>
          </div>
          <div className="named">Description</div>
        </div>
        <span class="material-symbols-outlined">chevron_right</span>
        <div
          className={`step ${props.activestep === "4" ? "active-step" : ""}`}
        >
          <div className="number">
            <span>4</span>
          </div>
          <div className="named">Tickets</div>
        </div>
        <span class="material-symbols-outlined">chevron_right</span>
        <div
          className={`step ${props.activestep === "5" ? "active-step" : ""}`}
        >
          <div className="number">
            <span>5</span>
          </div>
          <div className="named">Gallery</div>
        </div>

        <span class="material-symbols-outlined">chevron_right</span>
        <div
          className={`step ${props.activestep === "6" ? "active-step" : ""}`}
        >
          <div className="number">
            <span>6</span>
          </div>
          <div className="named">Publish</div>
        </div>
      </div>
    </div>
  );
}
export default Createeventflow;
