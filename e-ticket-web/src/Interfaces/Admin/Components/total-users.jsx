import React from "react";

const TotalUsers = () => {
  return (
    <div className="admin-dashboard-card total-users">
      <div className="admin-dashboard-card-container">
        <div className="top">
          <div className="number">103,948</div>
          <div className="label">Total user</div>
          <div className="this good">+1,038 this week</div>
        </div>
        <div className="icon bottom">
          <span class="material-symbols-outlined">group</span>
        </div>
      </div>
    </div>
  );
};

export default TotalUsers;
