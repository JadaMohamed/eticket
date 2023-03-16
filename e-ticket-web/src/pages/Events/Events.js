import Navbar from "../../components/common/navbar";
import SubNavbar from "../../components/common/subnavbar";
import EventPreview from "../../components/event/event_preview";
import MoreBy from "../../components/event/moreby";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Hypnosis } from "react-cssfx-loading";
import loader from "../../img/loading.svg";
import Axios from "axios";
import "./Events.css";

function Events() {
  let { value } = useParams();
  const [event, setEvent] = useState();
  const apiUrl = process.env.REACT_APP_API_URL;

  const searchEvent = async (keyword) => {
    try {
      const response = await Axios.get(`${apiUrl}/api/events/${keyword}`);
      setEvent(response.data);
      console.log(event);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    searchEvent(value);
  }, [value]);

  return (
    <>
      <Navbar />
      <SubNavbar />
      {event ? (
        <>
          <EventPreview event={event} />
          <MoreBy id={event?.org_id} />
        </>
      ) : (
        <div className="loading">
          <img src={loader} />
        </div>
      )}
    </>
  );
}

export default Events;
