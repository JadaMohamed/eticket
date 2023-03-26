import React from "react";

const TotalUsers = ({TotalUsers, lastWeek}) => {
  return (
    <div className="admin-dashboard-card total-users">
      <div className="admin-dashboard-card-container">
        <div className="top">
          <div className="number">{TotalUsers}</div>
          <div className="label">Total user</div>
          <div className="this good">+{lastWeek} this week</div>
        </div>
        <div className="icon bottom">
          <span class="material-symbols-outlined">group</span>
        </div>
      </div>
    </div>
  );
};

export default TotalUsers;
