import "./common.css";
import Axios from "axios";
import loader from "../../../../img/loading.svg";
import { useEffect, useState } from "react";
import Card from "../../../../components/event/eventcard";

function ForYouEvents(props) {
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
    getEvents();
  }, []);
  const [alert, setAlert] = useState(true);

  return (
    <div className="localevents">
      <alert
        color={"orange"}
        msg={"Please Sign in to manage your cart"}
        icon={"error"}
        setAlert={setAlert}
        alert={alert}
      />
      <div className="localevent-container">
        <div className="section-title">Suggestions </div>
        {events.length > 0 ? (
          <div className="cards">
            {events.map((event) => (
              <Card
                key={event.event_id}
                eventid={event.event_id}
                image={event.brand_url}
                title={event.title}
                price={
                  event?.SeatCategory?.reduce((prev, current) => {
                    return prev.type_price < current.type_price
                      ? prev
                      : current;
                  }, {}).type_price
                }
                location={event.location}
                category={event.event_type}
                date={event.start_time}
                orgid={event.org_id}
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
export default ForYouEvents;
