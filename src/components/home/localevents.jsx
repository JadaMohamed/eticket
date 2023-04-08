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
      // console.log("Events : ", response.data);
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
                  image={levent.brand_url} // select the first image
                  title={levent.title}
                  // price={levent?.SeatCategory[0]?.type_price}
                  price={
                    levent?.SeatCategory?.reduce((prev, current) => {
                      return prev.type_price < current.type_price
                        ? prev
                        : current;
                    }).type_price
                  }
                  location={levent.location}
                  category={levent.event_type}
                  date={levent.start_time}
                  orgid={levent.org_id}
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
