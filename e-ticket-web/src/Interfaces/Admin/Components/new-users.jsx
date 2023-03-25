import React from "react";
import NewUserCard from "./new-user-comp";

const NewUsers = () => {
  return (
    <div className="new-users">
      <div className="new-users-container">
        <div className="section-header">
          <div className="title">New User</div>
          <div className="this good">+1,038 this week</div>
        </div>
        <div className="users">
          <NewUserCard />
          <NewUserCard />
          <NewUserCard />
          <NewUserCard />
          <NewUserCard />
        </div>
      </div>
    </div>
  );
};

export default NewUsers;
