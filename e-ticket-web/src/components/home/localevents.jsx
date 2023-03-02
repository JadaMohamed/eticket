import "../../css/localevents.css";
import Card from "../event/eventcard";
import { eventData, account } from "../data";
import Axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../Constants";

function LocalEvents(props) {
  const [levents, setEvents] = useState([]);

  const searchEvents = async () => {
    try {
      const response = await Axios.get(`${BASE_URL}/api/events`);
      setEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    searchEvents();
  }, []);

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
          {levents
            .filter((levent) => levent.location.includes("Agadir"))
            .slice(0, 4)
            .map((levent) => (
              <Card
                key={levent.eventId}
                image={
                  levent.Event_Images.length > 0
                    ? levent.Event_Images[0].img_url
                    : null
                } // select the first image
                title={levent.title}
                price={levent.price}
                location={levent.location}
                category={levent.event_type}
                date={levent.start_time}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
// {Object.keys(account).map((key) => (<h2> {key} : {account[key]}
export default LocalEvents;
