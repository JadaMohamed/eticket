import React, { useEffect, useState } from "react";
import "../../css/moreby.css";
import Card from "../event/eventcard";
import { eventData, account } from "../data";
import Axios from "axios";
import { BASE_URL } from "../../Constants";
import { useNavigate } from "react-router-dom";

function MoreBy(props) {
  const [events, setEvents] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const Nav = useNavigate();
  const getEvents = async () => {
    try {
      const response = await Axios.get(
        `${apiUrl}/api/events/organizer/${props.id}/all-events`
      );
      console.log(response.data);
      setEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    console.log("searcing for events");
    getEvents();
  }, []);
  return (
    <div className="localevents more-by">
      <div className="localevent-container">
        <div className="section-title">
          More by <span onClick={Nav("/organizer/1")}>{props.id}</span>
        </div>
        <div className="cards">
          {events.map((event) => (
            <Card
              key={event.event_id}
              eventid={event.event_id}
              image={
                event.Event_Images?.length > 0
                  ? event.Event_Images[0].img_url
                  : null
              } // select the first image
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
  );
}
export default MoreBy;
