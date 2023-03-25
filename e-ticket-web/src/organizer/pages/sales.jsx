import react, { useContext, useEffect, useState } from "react";
import OrNavigationBar from "../components/navigation_bar";
import SearchOrganizer from "../components/searchorganizer";
import SideBar from "../components/side_bar";
import "../css/sales.css";
import Graph1 from "../../img/biggraph.svg";
import Graph2 from "../../img/smallgraph.svg";
import Cercle from "../../img/cercle.svg";
import Selected from "../../img/selectedevent.svg";
import SalesTable from "../components/salestable";
import Navbar from "../../components/common/navbar";
import SubNavbar from "../../components/common/subnavbar";
import OrganizerSummary from "../components/organizer_summary";
import EventsDropDown from "../components/eventsdropdown";
import AuthContext from "../../Auth/AuthContext";
import Axios from 'axios';
import EventSummaryGraph from "../components/eventsummarygraph";
import SpecifiedEventSeatSales from "../components/specified_event_seats_sales";

function Sales() {
  const { profile } = useContext(AuthContext);
  const [orgEvents, setOrgEvents] = useState(null);
  const [eventId, setEventId] = useState(null);
  
  const apiUrl = process.env.REACT_APP_API_URL;

  const getOrganizerEvents = async () => {
    try {
      const response = await Axios.get(
        `${apiUrl}/api/events/organizer/${profile.user.org_id}/all-events`,
      );
      console.warn("events : ", response.data)
      setOrgEvents(response.data);
      setEventId(response.data[0].event_id);
    } catch (error) {
      console.error("OrganizerSummary: Organizer don't have any events yet");
    }
  };

  useEffect(() => {
    getOrganizerEvents();
  }, [profile])

  
  return (
    <div>
      <Navbar />
      <SideBar activeBtn="sales" />
      <div className="container">
        <SearchOrganizer ph="sales" />
        <div className="orga-page-content">
          <div className="content-section-title">Sales statistics</div>
          <div className="graph">
            <OrganizerSummary title={"Overview"} width={"100%"} height={"30%"} summaryChartStyle={{
              width: "100%",
              display: "flex",
              height: 478,
              alignItems: "center",
              justifyContent: "center"
            }} />
          </div>
          <div className="content-section-title">
            Select event to view statistics
          </div>
          <div className="events-drop-down">
            <EventsDropDown orgEvents={orgEvents?.[0]} eventId={eventId}/>
          </div>
          <div className="selected-event-stats">
            <div className="graph">
              {/* <img src={Graph2} alt="" /> */}
              <EventSummaryGraph eventId={eventId}/>
            </div>
            <div className="cercle">
              {/* <img src={Cercle} alt="" /> */}
              <SpecifiedEventSeatSales eventId={eventId}/>
            </div>
          </div>
          <div className="title-actions">
            <div className="content-section-title">Sales</div>
            <div className="filter-buttons">
              <div className="overview btn active">
                <span>Overview</span>
              </div>
              <div className="as-selected btn">
                <span>As Selected</span>
              </div>
            </div>
          </div>
          <SalesTable />
        </div>
      </div>
    </div>
  );
}

export default Sales;
