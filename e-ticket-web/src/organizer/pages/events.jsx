import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../components/eventcard";
import OrNavigationBar from "../components/navigation_bar";
import SearchOrganizer from "../components/searchorganizer";
import SideBar from "../components/side_bar";
import "../css/events.css";
import Axios from 'axios'
import AuthContext from "../../Auth/AuthContext";

function OrEvents() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { profile } = useContext(AuthContext);

  const Nav = useNavigate();
  const [allEvents, setAllEvents] = useState([]);
  const [allFechedEvents, setAllFechedEvents] = useState([]);
  const [numSilling, setNumSilling] = useState();
  const [numPaused, setNumPaused] = useState();


  useEffect(() => {
    if (allEvents) {
      setNumSilling(allEvents.filter(event => event.is_start_selling).length);
      setNumPaused(allEvents.filter(event => !event.is_start_selling).length);
    }
  }, [allEvents]);

  useEffect(() => {
    fetchAllOrganizerEvents();
  }, [profile])
  async function fetchAllOrganizerEvents() {
    try {
      const response = await Axios.get(`${apiUrl}/api/events/organizer/${profile.user.org_id}/all-events`);
       console.log(response.data);
      setAllEvents(response.data);
      setAllFechedEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <OrNavigationBar activepage="Events" />
      <SideBar activeBtn="events" />
      <div className="container">
        <SearchOrganizer ph="events" setAllEvents={setAllEvents} allFechedEvents={allFechedEvents}/>
        <div className="orga-page-content">
          <div className="filter-svents">
            <div className="all-ev filter-ev active">
              <label>All events</label>
              <span>{allEvents.length}</span>
            </div>
            <div className="selling-ev filter-ev">
              <label>Selling</label>
              <span>{numSilling}</span>
            </div>
            <div className="paused-ev filter-ev">
              <label>Paused</label>
              <span>{numPaused}</span>
            </div>
            <div className="ended-ev filter-ev">
              <label>Ended</label>
              <span>1</span>
            </div>
          </div>
          <div className="cards">
            {allEvents ? (
              allEvents.map((event) => (
                <EventCard key={event.event_id}
                  event={event}
                  numSilling={numSilling}
                  setNumSilling={setNumSilling}
                  numPaused={numPaused}
                  setNumPaused={setNumPaused} />
              ))
            ) : (
              <p>No events found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrEvents;
