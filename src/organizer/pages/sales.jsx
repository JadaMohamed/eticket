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
import Axios from "axios";
import EventSummaryGraph from "../components/eventsummarygraph";
import SpecifiedEventSeatSales from "../components/specified_event_seats_sales";
import EarningRow from "../components/earning_row";
import WithrawForm from "../components/withraw_form";
import Alert from "../../components/common/alert";

function Sales() {
  const { profile } = useContext(AuthContext);
  const [orgEvents, setOrgEvents] = useState(null);
  const [withdraw, setWithdraw] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [eventId, setEventId] = useState();
  const [profit, setProfit] = useState();

  //for the Alert of the withraw in the starttime not passed by 48h
  const [alert, setAlert] = useState(true);
  const [alertParams, setAlertParams] = useState({
    color: "",
    msg: "",
    icon: "",
  });

  function trigerTheAlert(){
    setAlert(true);
    setAlertParams({
      color: "red",
      msg: "the event has not passed by 48h to withraw",
      icon: "error",
    });
  }

  const [eventProfits, setEventProfits] = useState([]);

  //this is for the some of profit of event still not passed
  // const [balanceAvailable, setBalanceAvailable] = useState("");
  const [balanceAvailable, setBalanceAvailable] = useState(0);
  // Update the balance whenever eventProfits changes
  useEffect(() => {
    setBalanceAvailable(eventProfits.filter((item) => item.withdrawn === 0)
      .reduce((accumulator, currentProfit) => {
        return accumulator + currentProfit.profit;
      }, 0));
  }, [eventProfits]);


  //this one for the some of all profits  without exeption that is because
  //we are not making the profit to 0 when organizer make withdrawn
  const [earningsSinceJoining, setEarningsSinceJoining] = useState(0);
  useEffect(() => {
    setEarningsSinceJoining(eventProfits.filter((item) => item.profit > 0)
      .reduce((accumulator, currentProfit) => {
        return accumulator + currentProfit.profit;
      }, 0));
  }, [eventProfits]);


  //this is the some of the earnings for the events that is passed and the organizer has
  //take his money
  const [withdrawnSinceJoining, setWithdrawnSinceJoining] = useState(0);
  // Update the withdrawn sum whenever eventProfits changes
  useEffect(() => {
    setWithdrawnSinceJoining(eventProfits.filter((item) => item.withdrawn > 0)
      .reduce((accumulator, currentProfit) => {
        return accumulator + currentProfit.withdrawn;
      }, 0));
  }, [eventProfits]);










  useEffect(() => {
    fetchAllOrganizerEventProfits();
  }, [profile]);
  async function fetchAllOrganizerEventProfits() {
    if (!profile.user.org_id) {
      return;
    }
    try {
      const response = await Axios.get(
        `${apiUrl}/api/event-profit/organizer/${profile?.user.org_id}`,
        { withCredentials: true, }
      );
      console.log(response.data);
      setEventProfits(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Alert
        color={alertParams.color}
        msg={alertParams.msg}
        icon={alertParams.icon}
        setAlert={setAlert}
        alert={alert}
      />
      <Navbar />
      <SideBar activeBtn="sales" />
      <div className="container">
        <div className="earning-cards">
          <div className="earning-cards-container">
            <div
              className="stats-card"
              style={{ borderRight: "1px solid var(--LightPurple)" }}
            >
              <div className="stats-card-container">
                <div className="card-header">
                  Available earning balance
                  <div className="sub-header">Balance available for use</div>
                </div>

                <div className="amount">
                  {balanceAvailable} <span>MAD</span>
                </div>
              </div>
            </div>
            <div
              className="stats-card"
              style={{ borderRight: "1px solid var(--LightPurple)" }}
            >
              <div className="stats-card-container">
                <div className="card-header">
                  Earnings to date{" "}
                  <div className="sub-header">Your earnings since joining.</div>
                </div>
                <div className="amount">
                  {earningsSinceJoining} <span>MAD</span>
                </div>
              </div>
            </div>
            <div className="stats-card">
              <div className="stats-card-container">
                <div className="card-header">
                  Withdrawn to date{" "}
                  <div className="sub-header">Withdrawn since joining.</div>
                </div>
                <div className="amount">
                  {withdrawnSinceJoining}<span>MAD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="earning-per-event">
          <div className="earning-per-event-container">
            <table>
              <tr>
                <th>Event</th>
                <th>Description</th>
                <th>Earned</th>
                <th>Withdrawn</th>
                <th>Date</th>
                <th></th>
              </tr>
              {eventProfits?.map((eventProfit) => (
                <EarningRow
                  key={eventProfit.event_id}
                  id={eventProfit.event_id}
                  title={eventProfit.Event.title}
                  profit={eventProfit.profit}
                  withdrawn={eventProfit.withdrawn}
                  withdrawn_date={eventProfit.withdrawnAt}
                  eventStart_data={eventProfit.Event.start_time}
                  setEventId={setEventId}
                  setWithdraw={setWithdraw}
                  setProfit={setProfit}
                  trigerTheAlert={trigerTheAlert}
                />
              ))}
            </table>
          </div>
        </div>
        {withdraw && <WithrawForm setWithdraw={setWithdraw} fetchAllOrganizerEventProfits={fetchAllOrganizerEventProfits} eventId={eventId} profit={profit} />}
      </div>
    </div>
  );
}

export default Sales;

// const getOrganizerEvents = async () => {
//   try {
//     const response = await Axios.get(
//       `${apiUrl}/api/events/organizer/${profile.user.org_id}/all-events`
//     );
//     console.warn("events : ", response.data);
//     setOrgEvents(response.data);
//     setEventId(response.data[4].event_id);
//   } catch (error) {
//     console.error("OrganizerSummary: Organizer don't have any events yet");
//   }
// };

// useEffect(() => {
//   getOrganizerEvents();
// }, [profile]);
{
  /* <div className="container">
<SearchOrganizer ph="sales" />
        <div className="orga-page-content">
          <div className="content-section-title">Sales statistics</div>
          <div className="graph">
            <OrganizerSummary
              title={"Overview"}
              width={"100%"}
              height={"30%"}
              summaryChartStyle={{
                width: "100%",
                display: "flex",
                height: 478,
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </div>
          <div className="content-section-title">
            Select event to view statistics
          </div>
          <div className="events-drop-down">
            <EventsDropDown orgEvents={orgEvents?.[0]} eventId={eventId} />
          </div>
          <div className="selected-event-stats">
            <div className="graph">
              <EventSummaryGraph eventId={eventId} />
            </div>
            <div className="cercle">
              <SpecifiedEventSeatSales eventId={eventId} />
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
      </div> */
}
