import React from "react";
import ActiveUsers from "../Components/active-users";
import AdminNavigationBar from "../Components/navbar";
import SideBar from "../Components/side_bar";
import TotalEvents from "../Components/total-events";
import TotalUsers from "../Components/total-users";
import UserStats from "../../../img/userstats.svg";
import "../CSS/admin-index.css";
import "../CSS/admin-dashboard.css";
import TotalActivity from "../Components/total-activity";
import NewUsers from "../Components/new-users";

const AdminDashboard = () => {
  return (
    <div>
      <AdminNavigationBar />
      <div className="admin-page">
        <SideBar activeBtn="dashboard" />
        <div className="admin-page-content">
          <div className="left-side">
            <div className="dashboard-cards">
              <ActiveUsers />
              <TotalUsers />
              <TotalEvents />
              <TotalUsers />
            </div>
            <TotalActivity />
          </div>
          <div className="right-side">
            <img src={UserStats} alt="" />
            <NewUsers />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
