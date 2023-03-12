import { useNavigate } from "react-router-dom";
import OrNavigationBar from "../components/navigation_bar";
import SearchOrganizer from "../components/searchorganizer";
import SideBar from "../components/side_bar";
import "../css/tickets.css";

function OrEvents() {
  const Nav = useNavigate();
  return (
    <div>
      <div className="container">
        <SearchOrganizer ph="events" />
      </div>
      <div className="Route-who-i-m">Events</div>
      <OrNavigationBar />
      <SideBar activeBtn="events" />
    </div>
  );
}

export default OrEvents;
