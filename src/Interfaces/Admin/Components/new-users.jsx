import React from "react";
import NewUserCard from "./new-user-comp";
import l from '../../../img/loading.svg'

const NewUsers = ({users, loader, thisWeek}) => {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    return `${month} ${day} ${hour}:${minute}`;
  }
  return (
    <div className="new-users">
      <div className="new-users-container">
        <div className="section-header">
          <div className="title">New User</div>
          {thisWeek ? <div className="this good">+{thisWeek} this week</div> : ""}
        </div>
        <div className="users">
          {loader? <div className="loading">
            <img src={l} />
          </div>
          : (users.map((user)=><NewUserCard type={user.account_type} avatar={user.avatar} date={formatDate(user.created_at)} name={user.first_name+" "+user.last_name}/>))}
        </div>
      </div>
    </div>
  );
};

export default NewUsers;
