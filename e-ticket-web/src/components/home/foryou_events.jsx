import "../../css/localevents.css";
import Card from "../event/eventcard";
import { eventData, account } from "../data";
import eventImage from "../../img/event-image.jpg";
import FYEvents from "../../components/home/foryou_events";
import { BASE_URL } from "../../Constants";
import Axios from "axios";
import { useEffect, useState } from "react";

function LocalEvents(props) {
  const [events, setEvents] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const getEvents = async () => {
    try {
      const response = await Axios.get(`${apiUrl}/api/events`);
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
    <div className="localevents">
      <div className="localevent-container">
        <div className="section-title">Suggestions </div>
        <div className="cards">
          {events.map((event) => (
            <Card
              key={event.eventId}
              image={
                event.Event_Images.length > 0
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
// {Object.keys(account).map((key) => (<h2> {key} : {account[key]}
export default LocalEvents;
