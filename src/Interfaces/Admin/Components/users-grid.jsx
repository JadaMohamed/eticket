import React, { useState, useEffect } from "react";
import axios from "axios";
import GridPagination from "./grid-pagination";
import l from "../../../img/loading.svg";

const UsersGrid = ({ users }) => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrenPage] = useState(1);
  const [userPerPage, setUserPerPage] = useState(10);
  const indexOfLastUser = currentPage * userPerPage;
  const indexOfFirstUser = indexOfLastUser - userPerPage;
  const currentUsers = users?.slice(indexOfFirstUser, indexOfLastUser);
  const apiUrl = process.env.REACT_APP_API_URL;
  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "long" });
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const year = date.getFullYear();
    return `${month} ${day}, ${year} ${hour}:${minute}`;
  }

  const verifyOrganizer = async (id) => {
    const res = await axios.get(`${apiUrl}/api/organizers/verify-organizer/${id}`, {
      withCredentials: true,
    });

    console.log(res.data);
  };

  const paginate = (number) => setCurrenPage(number);
  console.log(users);
  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <div className="users-grid">
      <div className="users-grid-container">
        <table>
          <tr>
            <th>A</th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Joined</th>
            <th>Type</th>
            <th>Last activity</th>
            <th></th>
            <th></th>
          </tr>
          {currentUsers?.length === 0 ? (
            <div className="loading">
              <img src={l} />
            </div>
          ) : (
            currentUsers?.map((user) => (
              <tr>
                <td className="avatar">
                  <img src={user.avatar} style={{ width: "100%" }} />
                </td>
                <td>{user.account_id}</td>
                <td>
                  {user.first_name} {user.last_name}
                </td>
                <td>
                  <div class="truncate">{user.email}</div>
                </td>
                <td>{formatDate(user.created_at)}</td>
                <td>{user.account_type}</td>
                <td>Yesterday 13:35</td>
                {user.account_type === "organizer" ? (
                  <td title="Verify Organizer" onClick={() => verifyOrganizer(user.account_id)}>
                    <span class="material-symbols-outlined verify">
                      verified
                    </span>{" "}
                  </td>
                ) : (
                  <td></td>
                )}
                <td title="Block User">
                  <span class="material-symbols-outlined">block</span>
                </td>
              </tr>
            ))
          )}
        </table>
        <GridPagination
          userPerPage={userPerPage}
          totalUsers={users?.length}
          paginate={paginate}
          setUserPerPage={setUserPerPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default UsersGrid;
