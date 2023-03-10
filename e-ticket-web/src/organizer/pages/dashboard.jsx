import React from "react";
import "../css/dashboard.css";
import OrNavigationBar from "../components/navigation_bar";
import SideBar from "../components/side_bar";
import SalesCardDash from "../components/salescard_dash";
import SalesCard from "../components/salesofevent";
import left from "../../img/left.svg";
import right from "../../img/right.svg";
import RecentOrders from "../components/recent_orders";

function Dashboard() {
  return (
    <div>
      <OrNavigationBar />
      <SideBar activeBtn="dashboard" />
      <div className="container">
        <div className="welcome">
          <div className="hi">Hi,Eticket Production</div>
          <div className="inst">Welcome back to your dashboard !</div>
        </div>
        <div className="cards-container">
          <SalesCardDash sales="239" totalSeats="320" />
          <SalesCard sales="39" totalSeats="80" />
          <SalesCard sales="55" totalSeats="80" />
          <SalesCard sales="145" totalSeats="160" />
        </div>
        <div className="images">
          <div className="left">
            <img src={left} alt="" />
          </div>
          <div className="right">
            <img src={right} alt="" />
          </div>
        </div>
        <RecentOrders />
      </div>
    </div>
  );
}
export default Dashboard;
