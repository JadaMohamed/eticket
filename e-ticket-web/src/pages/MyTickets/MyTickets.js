import Navbar from "../../components/common/navbar";
import SubNavbar from "../../components/common/subnavbar";
import MyTicketsHeader from "../../components/ticket/myticketsheader";
import TicketsHead from "../../components/ticket/myticketproductsheader";
import Ticket from "../../components/ticket/ticket";
import "./MyTickets.css";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../Auth/AuthContext";
import Axios from "axios";

function MyTickets() {
  const { profile } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  const getTicketsByClientId = async () => {
    try {
      const response = await Axios.get(`${apiUrl}/api/tickets/client/${profile.user.client_id}`, { withCredentials: true });
      setTickets(response.data)
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    getTicketsByClientId();
  },[]);

  // The profile.profile thingy is so dumb btw.
  if (!(profile?.account?.account_type === "client")) {
    return (
      <>
        <Navbar />
        <SubNavbar />
        <div
          className="content-cart-page"
          style={{ alignItems: "center", height: "100vh", textAlign: "center" }}
        >
          <h1>Please sign in to view your tickets!</h1>
        </div>
      </>
    );
  }
  return (
    <>
      <Navbar />
      <SubNavbar />
      <MyTicketsHeader />
      <div className="content-cart-page">
        <div className="content-cart-page-container">
          <TicketsHead />
          {tickets && tickets.map((ticket) => (
            <div key={ticket.ticket_id}>
              <Ticket ticket={ticket} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MyTickets;
