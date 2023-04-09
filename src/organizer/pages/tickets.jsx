import SideBar from "../components/side_bar";
import "../css/tickets.css";
import Navbar from "../../components/common/navbar";
import "../css/tickets.css";
import Axios from "axios";
import AuthContext from "../../Auth/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Image } from "cloudinary-react";

function Tickets() {
  const [events, setEvents] = useState();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [selectedID, setSelectedID] = useState();
  const [selectedEvent, setSelectedEvent] = useState();
  const { profile } = useContext(AuthContext);
  useEffect(() => {
    fetchAllOrganizerEvents();
  }, [profile]);
  useEffect(() => {
    setSelectedEvent(events && events[0]);
  }, [events]);
  async function fetchAllOrganizerEvents() {
    try {
      const response = await Axios.get(
        `${apiUrl}/api/events/organizer/${profile.user.org_id}/all-events`
      );
      console.log(response.data);
      setEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  const handleSelectedChanged = (event) => {
    setSelectedID(event.target.value);
    console.log(event.target.value);
    const selectedEventObj = events.find(
      (eventObj) => parseInt(eventObj.event_id) === parseInt(event.target.value)
    );
    console.log(selectedEventObj);
    setSelectedEvent(selectedEventObj);
  };
  useEffect(() => {
    console.log(selectedEvent);
  }, [selectedEvent]);
  const formatDate = (dt) => {
    const date = new Date(dt);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "UTC",
    };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    return formatter.format(date);
  };
  return (
    <div>
      <div>
        <Navbar />

        <div className="organizer-page-content">
          <SideBar activeBtn="tickets" />
          <div className="container">
            <div className="orga-page-content">
              <div className="content-section-title">Search in </div>
              <div className="select-event">
                <div className="selcet">
                  <select
                    name="event"
                    onChange={handleSelectedChanged}
                    value={selectedID}
                  >
                    {events?.map((event) => (
                      <option value={event?.event_id}>
                        #{event?.event_id}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="preview-selected">
                  <div className="image">
                    <Image cloudName="djjwswdo4" publicId={selectedEvent?.brand_url} />
                  </div>
                  <div className="infos">
                    <div className="line">
                      <div className="title">
                        {selectedEvent?.title}{" "}
                        <span>#{selectedEvent?.event_id}</span>
                      </div>
                    </div>
                    <div className="line two">
                      <div className="category">
                        {selectedEvent?.event_type}
                      </div>
                      <div className="start">
                        <span>Start: </span>
                        {selectedEvent && formatDate(selectedEvent?.start_time)}
                      </div>
                      <div className="at">
                        <span>At: </span>
                        {selectedEvent?.location}
                      </div>
                      <div className="tickets">
                        <span>Solde:</span>
                        {selectedEvent?.number_sold_tickets}/
                        {selectedEvent?.max_number_attendants}
                      </div>
                      <div className="cteated">
                        <span>Created: </span>
                        {selectedEvent && formatDate(selectedEvent?.created_at)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tickets;
