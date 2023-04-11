import axios from "axios";
import React, { useEffect, useState } from "react";
import Alert from "../../../components/common/alert";
import AdminNavigationBar from "../Components/navbar";
import SearchUser from "../Components/search-users";
import SideBar from "../Components/side_bar";
import UsersGrid from "../Components/users-grid";
import "../CSS/admin-manage-users.css";

const AdminUserManager = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [users, setUsers] = useState();
  const [total, setTotal] = useState(0);
  const [alert, setAlert] = useState(false);
  const [alertParams, setAlertParams] = useState({
    color: "",
    msg: "",
    icon: "",
  });


  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`${apiUrl}/api/admins/users/all`, {
        withCredentials: true,
      });
      setUsers(res.data);
      setTotal(res.data.length);
      console.log(total);
    };
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    const res = await axios.delete(`${apiUrl}/api/accounts/${id}`, {
      withCredentials: true,
    });

    if (res.status == 200) {
      setAlertParams({ color: 'green', msg: `Account deleted successfully.`, icon: 'clock' })
      setAlert(true);
      console.log(res.data);
      return true;
    }
  };

  const deleteUserHandler = (account_id) => {
    if (deleteUser(account_id)) {
      setUsers(e => e.filter(e => e.account_id != account_id));
    }
  }
  const [userTypeToSearchIn, setUserTypeToSearchIn] = useState("all");
  return (
    <div>
      <Alert
        color={alertParams.color}
        msg={alertParams.msg}
        icon={alertParams.icon}
        setAlert={setAlert}
        alert={alert}
      />
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
              total={total}
            />
            <UsersGrid users={users} deleteUserHandler={deleteUserHandler} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserManager;
