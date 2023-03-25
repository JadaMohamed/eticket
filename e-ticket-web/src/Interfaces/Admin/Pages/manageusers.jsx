import React, { useState } from "react";
import AdminNavigationBar from "../Components/navbar";
import SearchUser from "../Components/search-users";
import SideBar from "../Components/side_bar";
import UsersGrid from "../Components/users-grid";
import "../CSS/admin-manage-users.css";

const AdminUserManager = () => {
  const [userTypeToSearchIn, setUserTypeToSearchIn] = useState("all");
  return (
    <div>
      <AdminNavigationBar />
      <div className="admin-page">
        <SideBar activeBtn="users" />
        <div className="admin-page-content">
          <div className="left-side">
            <SearchUser
            userTypeFilter={userTypeToSearchIn}
            setUserTypeFilter={setUserTypeToSearchIn}
            />
            <UsersGrid/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserManager;
