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
      setAllOrders(response.data)
    } catch (error) {
      console.error(error);
    }
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
        {/* <tr>
          <td>
            <span></span>
          </td>
          <td>N46MK</td>
          <td>Jan,31st,2023</td>
          <td>Jane Olas</td>
          <td>janeolas@email.com</td>
          <td>299</td>
          <td>NUK-9373-3LKD-J2</td>
        </tr> */}

        {allOrders.length === 0 ? (
          <div className="no-orders">No orders available</div>
        ) : (
          allOrders.map((order, index) => (
            <tr key={index}>
              <td>
                <span>
                  <img src={order.Client.Account ? order.Client.Account.avatar : ""} alt="avatar" style={{ width: '30px' }} />
                </span>
              </td>
              <td>{order.event_id}</td>
              <td>{order.Ordered_at}</td>
              <td>{order.Client.Account ? order.Client.Account.first_name + " " + order.Client.Account.last_name : ""}</td>
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
