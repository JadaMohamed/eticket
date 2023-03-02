import react from "react";
import OrNavigationBar from "../components/navigation_bar";
import SideBar from "../components/side_bar";
import "../css/tickets.css";

function Tickets() {
  return (
    <div>
      <div>
        <div className="Route-who-i-m">Tickets</div>
        <OrNavigationBar />
        <SideBar activeBtn="tickets" />
      </div>
    </div>
  );
}

export default Tickets;
