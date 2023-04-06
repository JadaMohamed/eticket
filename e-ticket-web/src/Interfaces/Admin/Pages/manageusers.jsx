import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminNavigationBar from "../Components/navbar";
import SearchUser from "../Components/search-users";
import SideBar from "../Components/side_bar";
import UsersGrid from "../Components/users-grid";
import "../CSS/admin-manage-users.css";

const AdminUserManager = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [users, setUsers] = useState();
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`${apiUrl}/api/admins/users/all`, {
        withCredentials: true,
      });
      setUsers(res.data);
    };
    fetchUsers();
  }, []);
  const [userTypeToSearchIn, setUserTypeToSearchIn] = useState("all");
  return (
    <div>
      <AdminNavigationBar />
      <div className="admin-page">
        <SideBar activeBtn="users" />
        <div className="better-experience">
          <span>
            Please open the app on your desktop device to view the full live
            experience.
          </span>
        </div>
        <div className="admin-page-content manage-users-page">
          <div className="left-side">
            <SearchUser
              userTypeFilter={userTypeToSearchIn}
              setUserTypeFilter={setUserTypeToSearchIn}
            />
            <UsersGrid users={users} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserManager;
