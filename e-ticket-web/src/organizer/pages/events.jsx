import { useNavigate } from "react-router-dom";
import EventCard from "../components/eventcard";
import OrNavigationBar from "../components/navigation_bar";
import SearchOrganizer from "../components/searchorganizer";
import SideBar from "../components/side_bar";
import "../css/events.css";

function OrEvents() {
  const Nav = useNavigate();
  return (
    <div>
      <OrNavigationBar activepage="Events" />
      <SideBar activeBtn="events" />
      <div className="container">
        <SearchOrganizer ph="events" />
        <div className="orga-page-content">
          <div className="filter-svents">
            <div className="all-ev filter-ev active">
              <label>All events</label>
              <span>10</span>
            </div>
            <div className="selling-ev filter-ev">
              <label>Selling</label>
              <span>6</span>
            </div>
            <div className="paused-ev filter-ev">
              <label>Paused</label>
              <span>3</span>
            </div>
            <div className="ended-ev filter-ev">
              <label>Ended</label>
              <span>1</span>
            </div>
          </div>
          <div className="cards">
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrEvents;
