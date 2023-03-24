import React, { useState } from "react";
import "../css/eventcard.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const EventCard = ({
  event,
  numSilling,
  setNumSilling,
  numPaused,
  setNumPaused,
}) => {
  const Nav = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [isSlling, setisSlling] = useState(event.is_start_selling);

  function ConvertDate(isodate) {
    const date = new Date(isodate);
    const options = { day: "numeric", month: "short" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  async function switchIsSilling() {
    try {
      const response = await Axios.put(
        `${apiUrl}/api/events/${event.event_id}`,
        { is_start_selling: !isSlling },
        { withCredentials: true }
      );
      if (response) {
        // console.log(response.data)
        if (isSlling) {
          setNumSilling(numSilling - 1);
          setNumPaused(numPaused + 1);
        } else {
          setNumSilling(numSilling + 1);
          setNumPaused(numPaused - 1);
        }
        setisSlling(response.data.is_start_selling);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="cardevent organizer-cardevent">
      <div className="previewimage with-title">
        <img src={event.brand_url} alt="" />
        <div className="event-title">{event.title}</div>
      </div>
      <div className="oevent-infos-actions">
        <div className="oevent-infos">
          <div className="oinfos">
            <div className="start">
              Start: <span>{ConvertDate(event.start_time)}</span>
            </div>
            <div className="addres">
              At: <span>{event.location}</span>
            </div>
          </div>
          <div className="sales-process">
            <div className="percent"></div>
          </div>
          <div className="svent-statu">
            Statu: <span>{isSlling ? "Selling" : "Paused"}</span>
          </div>
        </div>
        <div className="oevent-actions">
          <div className="change-statu">
            <div className="label" onClick={switchIsSilling}>
              {isSlling ? "Stop selling" : "Start selling"}
            </div>
          </div>
          <div className="actions">
            <div className="stats act">
              <span
                className="material-symbols-outlined"
                onClick={() =>
                  Nav(`/events/${event.event_id}`, { replace: false })
                }
              >
                equalizer
              </span>
            </div>
            <div className="edit act">
              <span className="material-symbols-outlined">edit</span>
            </div>
            <div className="share act">
              <span className="material-symbols-outlined">share</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
