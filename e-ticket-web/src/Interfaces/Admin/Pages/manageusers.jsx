import React from "react";
import AdminNavigationBar from "../Components/navbar";
import SideBar from "../Components/side_bar";

const AdminUserManager = () => {
  return (
    <div>
      <AdminNavigationBar />
      <div className="admin-page">
        <SideBar activeBtn="users" />
        <div className="admin-page-content">AdminManageUsers</div>
      </div>
    </div>
  );
};

export default AdminUserManager;
