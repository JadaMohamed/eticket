import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../components/eventcard";
import OrNavigationBar from "../components/navigation_bar";
import SearchOrganizer from "../components/searchorganizer";
import SideBar from "../components/side_bar";
import "../css/events.css";
import Axios from "axios";
import AuthContext from "../../Auth/AuthContext";
import Navbar from "../../components/common/navbar";
import SubNavbar from "../../components/common/subnavbar";

function OrEvents() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { profile } = useContext(AuthContext);
  const [activetab, setActivetab] = useState("all");
  const Nav = useNavigate();
  const [allEvents, setAllEvents] = useState([]);
  const [allFechedEvents, setAllFechedEvents] = useState([]);
  const [numSilling, setNumSilling] = useState();
  const [numPaused, setNumPaused] = useState();
  const [numEned, setNumEnded] = useState();

  useEffect(() => {
    if (allEvents) {
      setNumSilling(
        allEvents.filter(
          (event) =>
            event.is_start_selling && new Date(event.start_time) > new Date()
        ).length
      );
      setNumPaused(allEvents.filter((event) => !event.is_start_selling).length);
      setNumEnded(
        allEvents.filter((event) => new Date(event.start_time) < new Date())
          .length
      );
    }
  }, [allEvents]);

  useEffect(() => {
    fetchAllOrganizerEvents();
  }, [profile]);
  async function fetchAllOrganizerEvents() {
    try {
      const response = await Axios.get(
        `${apiUrl}/api/events/organizer/${profile.user.org_id}/all-events`
      );
      console.log(response.data);
      setAllEvents(response.data);
      setAllFechedEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const [showAllEvents, setShowAllEvents] = useState(true);
  const [showPausedEvents, setShowPausedEvents] = useState(false);
  const [showSellingEvents, setShowSellingEvents] = useState(false);
  const [showEndedEvents, setShowEndedEvents] = useState(false);
  const handleShowAllEvents = () => {
    setShowAllEvents(true);
    setShowPausedEvents(false);
    setShowSellingEvents(false);
    setShowEndedEvents(false);
  };

  const handleShowPausedEvents = () => {
    setShowAllEvents(false);
    setShowPausedEvents(true);
    setShowSellingEvents(false);
    setShowEndedEvents(false);
  };

  const handleShowSellingEvents = () => {
    setShowAllEvents(false);
    setShowPausedEvents(false);
    setShowSellingEvents(true);
    setShowEndedEvents(false);
  };

  const handleShowEndedEvents = () => {
    setShowAllEvents(false);
    setShowPausedEvents(false);
    setShowSellingEvents(false);
    setShowEndedEvents(true);
  };
  return (
    <div>
      <Navbar />
      <SideBar activeBtn="events" />
      <div className="container">
        <SearchOrganizer
          ph="events"
          setAllEvents={setAllEvents}
          allFechedEvents={allFechedEvents}
        />
        <div className="orga-page-content">
          <div className="filter-svents">
            <div
              className={`all-ev filter-ev ${
                activetab === "all" ? "active" : ""
              }`}
              onClick={() => {
                handleShowAllEvents();
                setActivetab("all");
              }}
            >
              <div className="label">All events</div>
              <span>{allEvents.length}</span>
            </div>
            <div
              className={`all-ev filter-ev ${
                activetab === "selling" ? "active" : ""
              }`}
              onClick={() => {
                handleShowSellingEvents();
                setActivetab("selling");
              }}
            >
              <div className="label">Selling</div>
              <span>{numSilling}</span>
            </div>
            {/* <div
              className={`all-ev filter-ev ${
                activetab === "not-selling" ? "active" : ""
              }`}
              onClick={() => {
                handleShowPausedEvents();
                setActivetab("not-selling");
              }}
            >
              <div className="label">Paused</div>
              <span>{numPaused}</span>
            </div> */}
            <div
              className={`all-ev filter-ev ${
                activetab === "ended" ? "active" : ""
              }`}
              onClick={() => {
                handleShowEndedEvents();
                setActivetab("ended");
              }}
            >
              <div className="label">Ended</div>
              <span>{numEned}</span>
            </div>
          </div>
          <div className="cards">
            {/* {allEvents ? ()
             
             : (
              <p>No events found.</p>
            )} */}{" "}
            {showAllEvents &&
              allEvents.map((event) => (
                <EventCard key={event.event_id} event={event} />
              ))}
            {showPausedEvents &&
              allEvents
                .filter((event) => event.is_start_selling === false)
                .map((event) => (
                  <EventCard key={event.event_id} event={event} />
                ))}
            {showSellingEvents &&
              allEvents
                .filter(
                  (event) =>
                    event.is_start_selling === true &&
                    new Date(event.start_time) > new Date()
                )
                .map((event) => (
                  <EventCard key={event.event_id} event={event} />
                ))}
            {showEndedEvents &&
              allEvents
                .filter((event) => new Date(event.start_time) < new Date())
                .map((event) => (
                  <EventCard key={event.event_id} event={event} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrEvents;
