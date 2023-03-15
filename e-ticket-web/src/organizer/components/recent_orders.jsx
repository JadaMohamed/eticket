import React, { useContext, useEffect, useState } from "react";
import "../css/recentorders.css";
import Order from "./order";
import Axios from "axios";
import AuthContext from "../../Auth/AuthContext";


const RecentOrders = () => {
  const { profile } = useContext(AuthContext);
  const apiUrl = process.env.REACT_APP_API_URL;

  const [recentOrders, setRecentOrders] = useState([]);


  const getRecentOrdersByOrganizer = async () => {

    try {
      const response = await Axios.get(
        `${apiUrl}/api/orders-cart/organizer/${profile.user.org_id}/recent`,
        { withCredentials: true }
      );
      setRecentOrders(response.data)
      // console.log(response.data)

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRecentOrdersByOrganizer();
  }, []);


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
      {recentOrders.length === 0 ? (
        <div className="no-orders">No recent orders available</div>
      ) : (
        recentOrders.map((order, index) => (
          <Order
            key={index}
            avatar={order.Client.Account ? order.Client.Account.avatar : ""}
            email={order.Client.Account ? order.Client.Account.email : ""}
            eventid={order.event_id}
            amount={order.total_price}
            buyername={order.Client.Account ? order.Client.Account.first_name + " " + order.Client.Account.last_name : ""}
            ordernumber={order.order_id}
            date={order.Ordered_at}
          />
        ))
      )}



      {/* <Order
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
      /> */}
    </div>
  );
};

export default RecentOrders;
