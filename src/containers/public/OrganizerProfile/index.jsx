import React, { useEffect, useState } from "react";
import Card from "../../../components/event/eventcard";
// import eventImage from "../../../img/event-image.jpg";
// import { eventData, account } from "../../../components/data";
import Axios from "axios";
import loader from "../../../img/loading.svg";
import "./index.css";
import { useNavigate, useParams } from "react-router-dom";

const OrganizerProfile = () => {
  let { orgID } = useParams();
  const [activeTab, setActiveTab] = useState("now");
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
  const B = events.filter((event) => new Date(event.start_time) < now);
  useEffect(() => {
    getEvents();
    getOrganizer();
    console.log(events);
    console.log(orgID);
  }, [orgID]);
  return (
    <>
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
                      <img src={organizer?.Account?.avatar} alt="" />
                    </div>
                    <div className="name-discreption">
                      <div
                        className="name"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          paddingTop: "10px",
                        }}
                      >
                        {organizer?.Account?.first_name}{" "}
                        {organizer?.Account?.last_name}{" "}
                        {organizer?.isVerified ? (
                          <span
                            title="This Organizer is verified"
                            class="material-symbols-outlined"
                            style={{
                              fontVariationSettings: "'FILL' 1",
                              color: "var(--Purple)",
                              fontSize: "18px",
                              marginLeft: "10px",
                              cursor: "pointer",
                            }}
                          >
                            verified
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      <div
                        className="discreption"
                        style={{ fontSize: "14px", paddingTop: "10px" }}
                      >
                        {organizer?.Description}
                      </div>
                      <div className="social-media">
                        {!organizer?.Facebook ? (
                          <div
                            className="social-link"
                            title={`${organizer?.Account?.first_name} ${organizer?.Account?.last_name} has no Facebook link`}
                          >
                            <i class="fa-brands fa-facebook-f"></i>
                          </div>
                        ) : (
                          <div className="social-link">
                            <a href={organizer?.Facebook}>
                              <i class="fa-brands fa-facebook-f"></i>
                            </a>
                          </div>
                        )}

                        {!organizer?.Twitter ? (
                          <div
                            className="social-link"
                            title={`${organizer?.Account?.first_name} ${organizer?.Account?.last_name} has no Twitter link`}
                          >
                            <i class="fa-brands fa-twitter"></i>
                          </div>
                        ) : (
                          <div className="social-link">
                            <a href={organizer?.Twitter}>
                              <i class="fa-brands fa-twitter"></i>
                            </a>
                          </div>
                        )}

                        {!organizer?.Instagram ? (
                          <div
                            className="social-link"
                            title={`${organizer?.Account?.first_name} ${organizer?.Account?.last_name} has no Instagram link`}
                          >
                            <i class="fa-brands fa-instagram"></i>
                          </div>
                        ) : (
                          <div className="social-link">
                            <a href={organizer?.Instagram}>
                              <i class="fa-brands fa-instagram"></i>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="bottom-infos"></div>
                </div>
                <div className="navigation">
                  <div
                    className={`events btn ${
                      activeTab === "now" ? "active" : ""
                    }`}
                    onClick={() => {
                      setActiveTab("now");
                    }}
                  >
                    Events
                  </div>
                  <div
                    className={`past-events btn ${
                      activeTab === "past" ? "active" : ""
                    }`}
                    onClick={() => {
                      setActiveTab("past");
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
                    {activeTab === "now"
                      ? events
                          .filter(
                            (event) => new Date(event.start_time) > new Date()
                          )
                          .map((event) => (
                            <Card
                              key={event.event_id}
                              eventid={event.event_id}
                              image={event.brand_url}
                              title={event.title}
                              price={event.SeatCategory[0].type_price}
                              location={event.location}
                              category={event.event_type}
                              date={event.start_time}
                              orgid={event.org_id}
                            />
                          ))
                      : events
                          .filter(
                            (event) => new Date(event.start_time) < new Date()
                          )
                          .map((event) => (
                            <Card
                              key={event.event_id}
                              eventid={event.event_id}
                              image={event.brand_url}
                              title={event.title}
                              price={event.SeatCategory[0].type_price}
                              location={event.location}
                              category={event.event_type}
                              date={event.start_time}
                              orgid={event.org_id}
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

export default OrganizerProfile;
