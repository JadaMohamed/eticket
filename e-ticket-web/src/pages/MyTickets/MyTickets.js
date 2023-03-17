import Navbar from "../../components/common/navbar";
import SubNavbar from "../../components/common/subnavbar";
import MyTicketsHeader from "../../components/ticket/myticketsheader";
import TicketsHead from "../../components/ticket/myticketproductsheader";
import Ticket from "../../components/ticket/ticket";
import "./MyTickets.css";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../Auth/AuthContext";
import Axios from "axios";
import loader from "../../img/loading.svg";
import QrCodeViewer from "../../components/ticket/qrcodeviewer";

function MyTickets() {
  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
    setView(true);
  };
  const { profile } = useContext(AuthContext);
  const [view, setView] = useState(false);
  const [tickets, setTickets] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [selectedTicket, setSelectedTicket] = useState(null);
  const getTicketsByClientId = async () => {
    try {
      const response = await Axios.get(
        `${apiUrl}/api/tickets/client/${profile.user.client_id}`,
        { withCredentials: true }
      );
      setTickets(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    console.log(view);
  });
  useEffect(() => {
    console.log(selectedTicket);
  }, [selectedTicket]);
  useEffect(() => {
    getTicketsByClientId();
  }, [profile]);

  // The profile.profile thingy is so dumb btw.
  if (!(profile?.account?.account_type === "client")) {
    return (
      <>
        <Navbar />
        <SubNavbar />
        <MyTicketsHeader />
        <div className="content-cart-page">
          <div className="content-cart-page-not-signed">
            <div className="content">Please sign in to view your tickets</div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Navbar />
      <SubNavbar />
      <MyTicketsHeader />
      {view ? (
        <QrCodeViewer code={selectedTicket?.qrcode} view={setView} />
      ) : (
        ""
      )}
      <div className="content-cart-page">
        <div className="content-cart-page-container">
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <div key={ticket.ticket_id}>
                <Ticket
                  ticket={ticket}
                  onClick={handleTicketClick}
                  selectedTicket={selectedTicket}
                />
              </div>
            ))
          ) : (
            <div className="loading">
              <img src={loader} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MyTickets;
