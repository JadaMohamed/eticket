import React, { useState } from "react";

const Description_form = () => {
  const [description, setDescription] = useState("");
  const [eventCategory, setEventCategory] = useState("");

  const handleDescriptionChange = (event) => {
    if (event.target.value.length > 300) {
      return;
    }
    setDescription(event.target.value);
  };

  const handleEventCategoryChange = (event) => {
    setEventCategory(event.target.value);
  };

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
          <textarea
            name="event-title"
            id=""
            rows="8"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
          <div className="instructions">{description.length}/300 max</div>
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
              <select
                name="event-category"
                id=""
                value={eventCategory}
                onChange={handleEventCategoryChange}
              >
                <option value="Festivale | Concert">Festivale | Concert</option>
                <option value="Family">Family</option>
                <option value="Theater | Cinema">Theater | Cinema</option>
                <option value="Sport">Sport</option>
                <option value="Course | Lecture">Course | Lecture</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Description_form;
