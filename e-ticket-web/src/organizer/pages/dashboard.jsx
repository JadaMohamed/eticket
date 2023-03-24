import React, { useContext, useEffect, useState } from "react";
import "../css/dashboard.css";
import OrNavigationBar from "../components/navigation_bar";
import SideBar from "../components/side_bar";
import SalesCardDash from "../components/salescard_dash";
import SalesCard from "../components/salesofevent";
import left from "../../img/left.svg";
import right from "../../img/right.svg";
import RecentOrders from "../components/recent_orders";
import "../css/index.css";
import Axios from "axios";
import AuthContext from "../../Auth/AuthContext";
import OrganizerSummary from "../components/organizer_summary";
import Navbar from "../../components/common/navbar";
import SubNavbar from "../../components/common/subnavbar";
import SeatsSales from "../components/seats_sales";

function Dashboard() {
  const { profile } = useContext(AuthContext);
  const apiUrl = process.env.REACT_APP_API_URL;

  const [lastThreeEvents, setLastThreeEvents] = useState([]);
  const [eventsStats, setEventsStats] = useState();

  const getLastThreeEventsForOrganizer = async () => {
    try {
      const response = await Axios.get(
        `${apiUrl}/api/events/organizer/${profile.user.org_id}/last-three`,
        { withCredentials: true }
      );
      // console.log(response.data)
      setLastThreeEvents(response.data.events);
      setEventsStats(response.data.eventsStats);
    } catch (error) {
      console.error("Organizer dont have events");
    }
  };

  useEffect(() => {
    getLastThreeEventsForOrganizer();
    console.log(lastThreeEvents);
  }, [profile]);

  return (
    <div>
      <Navbar />
      <div className="organizer-page-content">
        <SideBar activeBtn="dashboard" />
        <div className="container">
          <div className="welcome">
            <div className="hi">Hi,Eticket Production</div>
            <div className="inst">Welcome back to your dashboard !</div>
          </div>
          <div className="cards-container">
            {eventsStats && (
              <SalesCardDash
                sales={eventsStats.totalSoldTickets}
                totalSeats={eventsStats.totalMaxAttendees}
              />
            )}
            {lastThreeEvents[2] && (
              <SalesCard
                sales={lastThreeEvents[2].number_sold_tickets}
                totalSeats={lastThreeEvents[2].max_number_attendants}
                image={lastThreeEvents[2].brand_url}
              />
            )}
            {lastThreeEvents[1] && (
              <SalesCard
                sales={lastThreeEvents[1].number_sold_tickets}
                totalSeats={lastThreeEvents[1].max_number_attendants}
                image={lastThreeEvents[1].brand_url}
              />
            )}
            {lastThreeEvents[0] && (
              <SalesCard
                sales={lastThreeEvents[0].number_sold_tickets}
                totalSeats={lastThreeEvents[0].max_number_attendants}
                image={lastThreeEvents[0].brand_url}
              />
            )}
          </div>
          <div className="graphs">
            <div className="left">
              {/* <img src={left} alt="" /> */}
              <OrganizerSummary title={"Summary"}/>
            </div>
            <div className="right">
              {/* <img src={right} alt="" /> */}
              <SeatsSales />
            </div>
          </div>
          <RecentOrders />
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
