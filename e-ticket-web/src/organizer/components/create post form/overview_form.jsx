import React, { useState } from "react";
import "../../css/create post form/index.css";

const Overview_form = ({ eventData, setEventData }) => {
  const [eventTitle, setEventTitle] = useState(eventData.eventTitle);
  const [date, setDate] = useState(eventData.date);
  const [time, setTime] = useState(eventData.time);
  const [address1, setAddress1] = useState(eventData.address1);
  const [address2, setAddress2] = useState(eventData.address2);

  const handleAddress1Change = (e) => {
    if (e.target.value.length >50){
      return;
    }
    setAddress1(e.target.value)
    setEventData((prevData) => ({
      ...prevData,
      address1: e.target.value,
    })); 
  };
  
  const handleAddress2Change = (e) => {
    if (e.target.value.length > 50) {
      return;
    }
    setAddress2(e.target.value);
    setEventData((prevData) => ({
      ...prevData,
      address2: e.target.value,
    }));
  };


  const handleEventTitleChange = (e) => {
    if (e.target.value.length > 50) {
      return;
    }
    setEventTitle(e.target.value);
    setEventData((prevData) => ({
      ...prevData,
      eventTitle: e.target.value,
    }));
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
    setEventData((prevData) => ({
      ...prevData,
      date: e.target.value,
    }));
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
    setEventData((prevData) => ({
      ...prevData,
      time: e.target.value,
    }));
  };

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
          <textarea
            name="event-title"
            id=""
            rows="3"
            value={eventTitle}
            onChange={handleEventTitleChange}
          ></textarea>
          <div className="instructions">{eventTitle.length}/50 max</div>
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
              <span className="material-symbols-outlined icon">calendar_month</span>
              <input
                 type="date"
                value={date}
                onChange={handleDateChange}
              />
            </div>
          </div>
          <div className="iconed-input">
            <div className="iconed-input-container">
              <span className="material-symbols-outlined icon">
                nest_clock_farsight_analog
              </span>
              <input
                type="time"
                value={time}
                onChange={handleTimeChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row-section">
        <div className="left-side-row-section">
          <div className="title">Address</div>
          <div className="instructions">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi,
            quidem aspernatur.
          </div>
        </div>
        <div className="right-side-row-section splited">
          <div className="iconed-input">
            <div className="iconed-input-container">
              <span className="material-symbols-outlined icon">pin_drop</span>
              <input
                type="text"
                value={address1}
                onChange={handleAddress1Change}
              />
            </div>
          </div>
          <div className="iconed-input">
            <div className="iconed-input-container">
              <span className="material-symbols-outlined icon">apartment</span>
              <input
                type="text"
                value={address2}
                onChange={handleAddress2Change}
              />
            </div>
          </div>
          <div className="instructions">{address1.length}/50 max</div>
        </div>
      </div>
    </>
  );
};

export default Overview_form;
