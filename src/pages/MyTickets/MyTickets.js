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
import Header from "../../components/common/Header";
import axios from "axios";
import Alert from "../../components/common/alert";


function MyTickets() {
  useEffect(() => {
    document.title = 'MyTickets - E-Ticket';
  }, []);
  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
    setView(true);
  };
  const { profile } = useContext(AuthContext);
  const [view, setView] = useState(false);
  const [Alltickets, setAllTickets] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [tickets, setTickets] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [checkedTickets, setCheckedTickets] = useState([]);

  const [alert, setAlert] = useState(true);
  const [alertParams, setAlertParams] = useState({
    color: "",
    msg: "",
    icon: "",
  });



  const handelSelectUnSelectAll = () => {
    if (checkedTickets.length !== tickets.length) {
      setCheckedTickets(tickets.map((ticket) => ticket.ticket_id));
    } else {
      setCheckedTickets([]);
    }

  }



  const deleteFromTickets = async () => {
    if (checkedTickets.length < 1) {
      return;
    }
    console.log('trying to delete from ticketes ..')
    const newTickets = tickets.filter(
      (item) => !checkedTickets.includes(item.ticket_id)
    );
    setTickets(newTickets);
    setAllTickets(newTickets);
    console.log('checkedTickets', checkedTickets)
    //all the tickets id and start time
    const ticketsAndStart = tickets.map((item) => {
      return {
        ticket_id: item.ticket_id,
        start_time: item.Event.start_time,
      }
    });

    //take the checked tickets only from the tickets And Start time table
    const checkedTicketsWithStartTime = ticketsAndStart.filter(
      (item) => checkedTickets.includes(item.ticket_id));

    //Clearing the checked tickets table to stop making request again
    setCheckedTickets([]);

    //Delete tickets in data base also
    try {
      const response = await axios.post(
        `${apiUrl}/api/tickets/delete-many`,
        { checkedTicketsWithStartTime },
        { withCredentials: true, },
      );
      if (response) {
        console.log(response.data)
      }
      console.log('nicccccccccccc')
      setAlert(true);
      setAlertParams({
        color: "orange",
        msg: "Only the passed ticket events can be deleted",
        icon: "error",
      });
      //Fetch the ticket again
      getTicketsByClientId();
    } catch (error) {
      console.error(error);
    }
  };

  const getTicketsByClientId = async () => {
    try {
      const response = await Axios.get(
        `${apiUrl}/api/tickets/client/${profile.user.client_id}`,
        { withCredentials: true }
      );
      setAllTickets(response.data);
      setTickets(response.data);
      console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  };
  // useEffect(() => {
  //   console.log(view);
  // });

  useEffect(() => {
    //on search incheck all tickets
    setCheckedTickets([]);
    //chearch mytickets implementation
    setTickets(
      Alltickets.filter(
        (ticket) =>
          ticket.Event.title.toLowerCase().includes(keyword.toLowerCase()) ||
          ticket.Event.location.toLowerCase().includes(keyword.toLowerCase()) ||
          ticket.Event.event_type.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  }, [keyword]);

  useEffect(() => {
    console.log(selectedTicket);
  }, [selectedTicket]);

  useEffect(() => {
    getTicketsByClientId();
  }, [profile]);

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
      <Alert
        color={alertParams.color}
        msg={alertParams.msg}
        icon={alertParams.icon}
        setAlert={setAlert}
        alert={alert}
      />
      <Navbar />
      <SubNavbar />
      <MyTicketsHeader
        keyword={keyword}
        setKeyword={setKeyword}
        numTickets={tickets.length}
        numCheckedTickets={checkedTickets.length}
        handelSelectUnSelectAll={handelSelectUnSelectAll}
        deleteFromTickets={deleteFromTickets}
      />
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
                  checkedTickets={checkedTickets}
                  setCheckedTickets={setCheckedTickets}

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
