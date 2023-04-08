import React from "react";

const TotalEvents = ({lastWeek, TotalEvents}) => {
  return (
    <div className="admin-dashboard-card total-users">
      <div className="admin-dashboard-card-container">
        <div className="top">
          <div className="number">{TotalEvents}</div>
          <div className="label">Total Events</div>
          <div className="this good">+{lastWeek} this week</div>
        </div>
        <div className="icon bottom">
          <span class="material-symbols-outlined">calendar_month</span>
        </div>
      </div>
    </div>
  );
};

export default TotalEvents;
