import React from "react";
import AdminNavigationBar from "../Components/navbar";
import SideBar from "../Components/side_bar";

const AdminSales = () => {
  return (
    <div>
      <AdminNavigationBar />
      <div className="admin-page">
        <SideBar activeBtn="sales" />
        <div className="admin-page-content">AdminSales</div>
      </div>
    </div>
  );
};

export default AdminSales;
