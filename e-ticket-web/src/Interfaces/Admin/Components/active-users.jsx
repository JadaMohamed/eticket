import React from "react";

const ActiveUsers = () => {
  return (
    <div className="admin-dashboard-card active-users">
      <div className="admin-dashboard-card-container">
        <div className="top">
          <div className="number">9,948</div>
          <div className="label">Active Now</div>
          <div className="this bad">-28% last hour</div>
        </div>
        <div className="icon bottom">
          <span class="material-symbols-outlined">adjust</span>
        </div>
      </div>
    </div>
  );
};

export default ActiveUsers;
