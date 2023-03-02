import React from "react";
import "../../css/create post form/index.css";

const Overview_form = () => {
  return (
    <>
      <div className="row-section">
        <div className="left-side-row-section">
          <div className="title">Event Title</div>
          <div className="instructions">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi,
            quidem aspernatur.
          </div>
        </div>
        <div className="right-side-row-section splited">
          <textarea name="event-title" id="" rows="3"></textarea>
          <div className="instructions">0/50 max</div>
        </div>
      </div>

      <div className="row-section">
        <div className="left-side-row-section">
          <div className="title">
            Date <span>&</span> Time
          </div>
          <div className="instructions">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi,
            quidem aspernatur.
          </div>
        </div>
        <div className="right-side-row-section splited">
          <div className="iconed-input">
            <div className="iconed-input-container">
              <span class="material-symbols-outlined icon">calendar_month</span>
              <input type="date" />
            </div>
          </div>
          <div className="iconed-input">
            <div className="iconed-input-container">
              <span class="material-symbols-outlined icon">
                nest_clock_farsight_analog
              </span>
              <input type="time" />
            </div>
          </div>
        </div>
      </div>
      <div className="row-section">
        <div className="left-side-row-section">
          <div className="title">Adress</div>
          <div className="instructions">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi,
            quidem aspernatur.
          </div>
        </div>
        <div className="right-side-row-section splited">
          <div className="iconed-input">
            <div className="iconed-input-container">
              <span class="material-symbols-outlined icon">pin_drop</span>
              <input type="text" />
            </div>
          </div>
          <div className="iconed-input">
            <div className="iconed-input-container">
              <span class="material-symbols-outlined icon">apartment</span>
              <input type="text" />
            </div>
          </div>
          <div className="instructions">0/50 max</div>
        </div>
      </div>
    </>
  );
};

export default Overview_form;
