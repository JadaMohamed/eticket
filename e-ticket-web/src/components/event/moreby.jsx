import React from "react";
import "../../css/moreby.css";
import Card from "../event/eventcard";
import { eventData, account } from "../data";

function MoreBy(props) {
  return (
    <div className="localevents more-by">
      <div className="localevent-container">
        <div className="section-title">
          More by <span>OrganizerName</span>
        </div>
        <div className="cards">
          {eventData.map((eventData) => (
            <Card
              key={eventData.eventId}
              image={eventData.image}
              title={eventData.title}
              price={eventData.price}
              location={eventData.location}
              category={eventData.category}
              date={eventData.date}
            />
          ))}
          {eventData.map((eventData) => (
            <Card
              key={eventData.eventId}
              image={eventData.image}
              title={eventData.title}
              price={eventData.price}
              location={eventData.location}
              category={eventData.category}
              date={eventData.date}
            />
          ))}
          {eventData.map((eventData) => (
            <Card
              key={eventData.eventId}
              image={eventData.image}
              title={eventData.title}
              price={eventData.price}
              location={eventData.location}
              category={eventData.category}
              date={eventData.date}
            />
          ))}
          {eventData.map((eventData) => (
            <Card
              key={eventData.eventId}
              image={eventData.image}
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
  );
}
export default MoreBy;
