import React, { useEffect, useState } from "react";
import Axios from "axios";

const Description_form = ({ eventData, setEventData, setmsgeError }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [description, setDescription] = useState(eventData.description);
  const [eventCategory, setEventCategory] = useState(eventData.eventCategory);
  const [otherCategory, setOtherCategory] = useState("");

  const handleDescriptionChange = (event) => {
    if (event.target.value.length > 300) {
      return;
    }
    setDescription(event.target.value);
    setEventData((prevData) => ({
      ...prevData,
      description: event.target.value,
    }));
  };

  const handleEventCategoryChange = (event) => {
    setmsgeError("");
    setEventCategory(event.target.value);
    setEventData((prevData) => ({
      ...prevData,
      eventType: event.target.value,
    }));
  };
  const handleOtherCategoryChange = (event) => {
    setmsgeError("");
    setOtherCategory(event.target.value);
    setEventData((prevData) => ({
      ...prevData,
      eventType: event.target.value,
    }));
  };



  const [categories, setCategories] = useState([]);

  const getAllEventsCategories = async () => {
    try {
      const response = await Axios.get(
        `${apiUrl}/api/events/allcategory`);
      // console.log(response.data)
      //fill categories with data
      const categoryOptions = response.data.categories.map((category) => ({
        value: category.event_type,
        label: category.event_type,
      }));
      setCategories(categoryOptions);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllEventsCategories();
  }, [])

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
              <span className="material-symbols-outlined icon">category</span>
              <select
                name="event-category"
                id=""
                value={eventCategory}
                onChange={handleEventCategoryChange}
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
                {/* <option value="Festivale | Concert">Festivale | Concert</option>
                <option value="Family">Family</option>
                <option value="Theater | Cinema">Theater | Cinema</option>
                <option value="Sport">Sport</option>
                <option value="Course | Lecture">Course | Lecture</option> */}
                <option value="Other">Other</option>
              </select>
              {eventCategory === "Other" && (
                <input
                  type="text"
                  name="other-category"
                  id=""
                  value={otherCategory}
                  onChange={handleOtherCategoryChange}
                  placeholder="Enter category"
                />
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Description_form;
