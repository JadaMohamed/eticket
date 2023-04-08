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
      setRecentOrders(response.data);
      // console.log(response.data)
    } catch (error) {
      console.error("Organizer don't have any events yet");
    }
  };

  useEffect(() => {
    getRecentOrdersByOrganizer();
  }, [profile]);

  const formatDate = (dt) => {
    const date = new Date(dt);
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
    return formatter.format(date);
  };
  return (
    <div className="recentorders">
      <div className="header">
        <div className="title">Recent orders</div>
        <div className="action">
          <span className="material-symbols-outlined" title="More options">
            more_vert
          </span>
        </div>
      </div>
      <table>
        <tr>
          <th>A</th>
          <th>Event ID</th>
          <th>Date</th>
          <th>Buyer name</th>
          <th>Email</th>
          <th>Amount</th>
          <th>Order Number</th>
        </tr>
        {recentOrders.length === 0 ? (
          <tr className="no-orders">
            <td
              style={{
                color: "var(--Grey1)",
                textAlign: "center",
                padding: "20px 0 20px 0",
                border: "0px solid red !important",
              }}
              colSpan={7}
            >
              <br />
              <br />
              <br />
              <br />
              <br />
              No recent orders available
              <br />
              <br />
              <br />
              <br />
              <br />
            </td>
          </tr>
        ) : (
          recentOrders.map((order, index) => (
            // <Order
            //   key={index}
            //   avatar={order.Client.Account ? order.Client.Account.avatar : ""}
            //   email={order.Client.Account ? order.Client.Account.email : ""}
            //   eventid={order.event_id}
            //   amount={order.total_price}
            //   buyername={
            //     order.Client.Account
            //       ? order.Client.Account.first_name +
            //         " " +
            //         order.Client.Account.last_name
            //       : ""
            //   }
            //   ordernumber={order.order_id}
            //   date={order.Ordered_at}
            // />
            <tr>
              <td className="avatar">
                <img
                  src={order.Client.Account.avatar}
                  style={{ width: "100%" }}
                />
              </td>

              <td>{order.event_id}</td>
              <td>{formatDate(order.Ordered_at)}</td>
              <td>
                {order.Client.Account
                  ? order.Client.Account.first_name +
                    " " +
                    order.Client.Account.last_name
                  : ""}
              </td>
              <td>{order.Client.Account ? order.Client.Account.email : ""}</td>
              <td>{order.total_price}</td>
              <td>{order.order_id}</td>
            </tr>
          ))
        )}
      </table>
    </div>
  );
};

export default RecentOrders;
