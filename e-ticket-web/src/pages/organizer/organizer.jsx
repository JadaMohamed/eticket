import React, { useState } from "react";
import Navbar from "../../components/common/navbar";
import SubNavbar from "../../components/common/subnavbar";
import Card from "../../components/event/eventcard";
import eventImage from "../../img/event-image.jpg";
import { eventData, account } from "../../components/data";

import "./organizer.css";

const Organizer = () => {
  const shuffledData = eventData.sort(() => 0.5 - Math.random());
  const [activeTab, setActiveTab] = useState("events");
  return (
    <>
      <Navbar />
      <SubNavbar />
      <div className="organizer-container">
        <div className="top-content">
          <div className="banner">
            <img src="" alt="" />
          </div>
          <div className="infos-nav">
            <div className="infos">
              <div className="top-infos">
                <div className="avatar">
                  <img src="" alt="" />
                </div>
                <div className="name-discreption">
                  <div className="name">E-Ticket Production</div>
                  <div className="discreption">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Odio soluta saepe, dolor beatae sint.
                  </div>
                  <div className="social-media">
                    <span class="material-symbols-outlined">
                      disabled_by_default
                    </span>
                    <span class="material-symbols-outlined">
                      disabled_by_default
                    </span>
                    <span class="material-symbols-outlined">
                      disabled_by_default
                    </span>
                    <span class="material-symbols-outlined">
                      disabled_by_default
                    </span>
                  </div>
                </div>
              </div>
              <div className="bottom-infos"></div>
            </div>
            <div className="navigation">
              <div
                className={`events btn ${
                  activeTab === "events" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveTab("events");
                }}
              >
                Events
              </div>
              <div
                className={`past-events btn ${
                  activeTab === "pevents" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveTab("pevents");
                }}
              >
                Past Events
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-content">
          <div className="localevents XXXX">
            <div className="localevent-container">
              <div className="cards">
                {activeTab === "event"
                  ? shuffledData.map((eventData) => (
                      <Card
                        key={eventData.eventId}
                        image={eventImage}
                        title={eventData.title}
                        price={eventData.price}
                        location={eventData.location}
                        category={eventData.category}
                        date={eventData.date}
                      />
                    ))
                  : shuffledData.map((eventData) => (
                      <Card
                        key={eventData.eventId}
                        image={eventImage}
                        title={eventData.title}
                        price={eventData.price}
                        location={eventData.location}
                        category={eventData.category}
                        date={eventData.date}
                      />
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Organizer;
