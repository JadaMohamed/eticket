import React from "react";
import "../css/order.css";

const Order = (props) => {
  const date = new Date(props.date);

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "UTC",
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  const formattedDate = formatter.format(date);
  return (
    <tr className="order">
      <td className="avatar">
        <img src={props.avatar} alt="avatar" style={{ width: "100%" }} />
      </td>
      <td className="eventid">{props.eventid}</td>
      <td className="date">{formattedDate}</td>
      <td className="buyername">{props.buyername}</td>
      <td className="email">{props.email}</td>
      <td className="amount">{props.amount}$</td>
      <td className="ordernumber">{props.ordernumber}</td>
    </tr>
  );
};

export default Order;
