import React from "react";

const NewUserCard = ({avatar, name, date, type}) => {
  return (
    <div className=" new-user-card">
      <div className="avatar">
        <img src={avatar} alt="" />
      </div>
      <div className="infos">
        <div className="name">
          {name} <span>({type})</span>
        </div>
        <div className="date">{date}</div>
      </div>
    </div>
  );
};

export default NewUserCard;
