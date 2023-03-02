import Navbar from "../../components/common/navbar";
import SubNavbar from "../../components/common/subnavbar";
import MyTicketsHeader from "../../components/ticket/myticketsheader";
import TicketsHead from "../../components/ticket/myticketproductsheader";
import Ticket from "../../components/ticket/ticket";
import "./MyTickets.css";
import { useContext } from "react";
import AuthContext from "../../Auth/AuthContext";

function MyTickets() {
  const { profile } = useContext(AuthContext);
  // console.log("my tucjets",profile.profile.account.account_type)

  // The profile.profile thingy is so dumb btw.
  if (!(profile?.profile?.account?.account_type === "client")) {
    return (
      <>
        <Navbar />
        <SubNavbar />
        <div className="content-cart-page" style={{alignItems:"center", height: "100vh", justifyContent:"center"}}>
          <h1>Please sign in to view your tickets!</h1>
        </div>
      </>

    )
  }
  return (
    <>
      <Navbar />
      <SubNavbar />
      <MyTicketsHeader />
      <div className="content-cart-page">
        <div className="content-cart-page-container">
          <TicketsHead />
          <Ticket />
        </div>
      </div>
    </>
  );
}

export default MyTickets;
