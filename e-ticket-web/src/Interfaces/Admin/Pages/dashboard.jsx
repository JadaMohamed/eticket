import React from "react";
import AdminNavigationBar from "../Components/navbar";
import SideBar from "../Components/side_bar";
import "../CSS/admin-index.css";

const AdminDashboard = () => {
  return (
    <div>
      <AdminNavigationBar />
      <div className="admin-page">
        <SideBar activeBtn="dashboard" />
        <div className="admin-page-content">AdminDashboard</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
