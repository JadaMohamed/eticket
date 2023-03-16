import "../../css/localevents.css";
import Card from "../event/eventcard";
import { eventData, account } from "../data";
import Axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../Constants";
import loader from "../../img/loading.svg";

function LocalEvents(props) {
  const [levents, setEvents] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  const searchEvents = async () => {
    try {
      const response = await Axios.get(`${apiUrl}/api/events`);
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
          Local events :<div className="user-city">{props.city}</div>
        </div>
        {levents.length > 0 ? (
          <div className="cards">
            {levents
              .filter((levent) => levent.location.includes(props.city))
              .slice(0, 4)
              .map((levent) => (
                <Card
                  key={levent.event_id}
                  eventid={levent.event_id}
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
        ) : (
          <div className="loading">
            <img src={loader} />
          </div>
        )}
      </div>
    </div>
  );
}
// {Object.keys(account).map((key) => (<h2> {key} : {account[key]}
export default LocalEvents;
