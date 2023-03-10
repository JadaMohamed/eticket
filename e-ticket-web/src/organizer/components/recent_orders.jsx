import React from "react";
import "../css/recentorders.css";
import Order from "./order";

const RecentOrders = () => {
  return (
    <div className="recentorders">
      <div className="header">
        <div className="title">Recent orders</div>
        <div className="action">
          <span class="material-symbols-outlined" title="More options">
            more_vert
          </span>
        </div>
      </div>
      <div className="head">
        <div className="avatar">A</div>
        <div className="eventid">Event ID </div>
        <div className="date">Date</div>
        <div className="buyername">Buyer name</div>
        <div className="email">Email</div>
        <div className="amount">Amount</div>
        <div className="ordernumber">Order number</div>
      </div>
      <Order
        avatar=""
        email="example@email.com"
        eventid="JUD638"
        amount="329"
        buyername="Jhon Noah"
        ordernumber="7KEM689"
        date="Jan 31st, 2032"
      />
      <Order
        avatar=""
        email="example@email.com"
        eventid="JUD638"
        amount="329"
        buyername="Jhon Noah"
        ordernumber="7KEM689"
        date="Jan 31st, 2032"
      />
      <Order
        avatar=""
        email="example@email.com"
        eventid="JUD638"
        amount="329"
        buyername="Jhon Noah"
        ordernumber="7KEM689"
        date="Jan 31st, 2032"
      />
    </div>
  );
};

export default RecentOrders;
