import "../../css/localevents.css";
import Card from "../event/eventcard";
import { eventData, account } from "../data";

function LocalEvents(props) {
  const filteredEvents = eventData.filter(
    (eventData) => eventData.location === "Agadir"
  );

  return (
    <div className="localevents">
      <div className="localevent-container">
        <div className="section-title">
          Local events :
          {account.map((userinfos) => {
            return <div className="user-city">{userinfos.City}</div>;
          })}
          <span className="material-symbols-outlined">person_pin_circle</span>
        </div>
        <div className="cards">
          {filteredEvents.slice(0, 4).map((eventData) => (
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
// {Object.keys(account).map((key) => (<h2> {key} : {account[key]}
export default LocalEvents;
