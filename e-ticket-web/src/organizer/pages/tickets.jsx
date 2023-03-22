import react from "react";
import OrNavigationBar from "../components/navigation_bar";
import SideBar from "../components/side_bar";
import "../css/tickets.css";
import Navbar from "../../components/common/navbar";
import SubNavbar from "../../components/common/subnavbar";

function Tickets() {
  return (
    <div>
      <div>
        <div className="Route-who-i-m">Tickets</div>
        <Navbar />
        <SideBar activeBtn="tickets" />
      </div>
    </div>
  );
}

export default Tickets;
