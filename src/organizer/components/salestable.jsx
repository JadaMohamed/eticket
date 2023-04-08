import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../Auth/AuthContext";
import "../css/salestable.css";
import Axios from "axios";

const SalesTable = () => {
  const { profile } = useContext(AuthContext);
  const apiUrl = process.env.REACT_APP_API_URL;

  const [allOrders, setAllOrders] = useState([]);

  const getAllOrdersByOrganizer = async () => {
    try {
      const response = await Axios.get(
        `${apiUrl}/api/orders-cart/organizer/${profile.user.org_id}/all`,
        { withCredentials: true }
      );
      setAllOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };
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
  useEffect(() => {
    getAllOrdersByOrganizer();
  }, [profile]);

  return (
    <div className="sales-table">
      <table>
        <tr>
          <th>A</th>
          <th>Event ID</th>
          <th>Date</th>
          <th>Buyer name</th>
          <th>Email</th>
          <th>Amount</th>
          <th>Order number</th>
        </tr>
        {allOrders.length === 0 ? (
          <div className="no-orders">No orders available</div>
        ) : (
          allOrders.map((order, index) => (
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

export default SalesTable;
