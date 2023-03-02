import React from "react";

const Description_form = () => {
  return (
    <>
      <div className="row-section">
        <div className="left-side-row-section">
          <div className="title">Description</div>
          <div className="instructions">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi,
            quidem aspernatur.
          </div>
        </div>
        <div className="right-side-row-section splited">
          <textarea name="event-title" id="" rows="8"></textarea>
          <div className="instructions">0/300 max</div>
        </div>
      </div>
      <div className="row-section">
        <div className="left-side-row-section">
          <div className="title">Event Category</div>
          <div className="instructions">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi,
            quidem aspernatur.
          </div>
        </div>
        <div className="right-side-row-section">
          <div className="iconed-input">
            <div className="iconed-input-container">
              <span class="material-symbols-outlined icon">category</span>
              <select name="event-category" id="">
                <option value="">Festivale | Concert</option>
                <option value="">Family</option>
                <option value="">Theater | Cinema</option>
                <option value="">Sport</option>
                <option value="">Course | Lecture</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Description_form;
