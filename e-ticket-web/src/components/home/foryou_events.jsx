import "../../css/localevents.css";
import Card from "../event/eventcard";
import { eventData, account } from "../data";
import eventImage from "../../img/event-image.jpg";
import FYEvents from "../../components/home/foryou_events";

function LocalEvents(props) {
  const shuffledData = eventData.sort(() => 0.5 - Math.random());
  return (
    <div className="localevents">
      <div className="localevent-container">
        <div className="section-title">Suggestions </div>
        <div className="cards">
          {shuffledData.map((eventData) => (
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
  );
}
// {Object.keys(account).map((key) => (<h2> {key} : {account[key]}
export default LocalEvents;
