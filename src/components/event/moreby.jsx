import React, { useEffect, useState } from "react";
import "../../css/moreby.css";
import Card from "../event/eventcard";
import { eventData, account } from "../data";
import Axios from "axios";
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
    getEvents();
  }, [props.id]);
  return (
    <div className="localevents more-by">
      <div className="localevent-container">
        <div className="section-title">
          More by{" "}
          <span onClick={() => Nav(`/organizer/${props.id}`)}>
            {events[0]?.Organizer?.Account?.first_name}{" "}
            {events[0]?.Organizer?.Account?.last_name}
          </span>
        </div>
        <div className="cards">
          {events.map((event) => (
            <Card
              key={event.event_id}
              eventid={event.event_id}
              image={event.brand_url}
              title={event.title}
              price={
                event?.SeatCategory?.reduce((prev, current) => {
                  return prev.type_price < current.type_price ? prev : current;
                }, {}).type_price
              }
              location={event.location}
              category={event.event_type}
              date={event.start_time}
              orgid={event.org_id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default MoreBy;
