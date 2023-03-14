import React from "react";
import "../css/order.css";

const Order = (props) => {
  return (
    <div className="order">
      <div className="avatar"> <img src={props.avatar} alt="avatar" style={{width:'100%'}}/></div>
      <div className="eventid">{props.eventid}</div>
      <div className="date">{props.date}</div>
      <div className="buyername">{props.buyername}</div>
      <div className="email">{props.email}</div>
      <div className="amount">{props.amount}$</div>
      <div className="ordernumber">{props.ordernumber}</div>
    </div>
  );
};

export default Order;
