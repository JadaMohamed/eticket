import React, { useEffect, useState } from "react";
import Navbar from "../../components/common/navbar";
import SubNavbar from "../../components/common/subnavbar";
import Card from "../../components/event/eventcard";
import eventImage from "../../img/event-image.jpg";
import { eventData, account } from "../../components/data";
import Axios from "axios";
import loader from "../../img/loading.svg";
import "./organizer.css";
import { useNavigate, useParams } from "react-router-dom";

const Organizer = () => {
  let { orgID } = useParams();
  const [activeTab, setActiveTab] = useState("events");
  const [organizer, setOrganizer] = useState();
  const [events, setEvents] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const Nav = useNavigate();
  const getOrganizer = async () => {
    try {
      const response = await Axios.get(
        `${apiUrl}/api/events/organizer-profile/${orgID}`
      );
      console.log(response.data);
      setOrganizer(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const getEvents = async () => {
    try {
      const response = await Axios.get(
        `${apiUrl}/api/events/organizer/${orgID}/all-events`
      );
      setEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const now = new Date();
  const A = events.filter((event) => new Date(event.start_time) > now);
  const B = events.filter((event) => new Date(event.start_time) <= now);
  useEffect(() => {
    getEvents();
    getOrganizer();
  }, []);
  return (
    <>
      <Navbar />
      <SubNavbar />
      <div className="organizer-container">
        {organizer ? (
          <>
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
                      <div className="discreption">{organizer.Description}</div>
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
                    Past events
                  </div>
                </div>
              </div>
            </div>
            <div className="bottom-content">
              <div className="localevents XXXX">
                <div className="localevent-container">
                  <div className="cards">
                    {activeTab === "event"
                      ? A.map((event) => (
                          <Card
                            key={event.event_id}
                            eventid={event.event_id}
                            image={
                              event.Event_Images?.length > 0
                                ? event.Event_Images[0].img_url
                                : null
                            }
                            title={event.title}
                            price={event.price}
                            location={event.location}
                            category={event.event_type}
                            date={event.start_time}
                          />
                        ))
                      : activeTab === "pevents" &&
                        B.map((event) => (
                          <Card
                            key={event.event_id}
                            eventid={event.event_id}
                            image={
                              event.Event_Images?.length > 0
                                ? event.Event_Images[0].img_url
                                : null
                            }
                            title={event.title}
                            price={event.price}
                            location={event.location}
                            category={event.event_type}
                            date={event.start_time}
                          />
                        ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="loading">
            <img src={loader} />
          </div>
        )}
      </div>
    </>
  );
};

export default Organizer;
