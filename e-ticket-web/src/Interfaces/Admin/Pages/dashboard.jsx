import React, { useContext, useEffect, useState } from "react";
import ActiveUsers from "../Components/active-users";
import AdminNavigationBar from "../Components/navbar";
import SideBar from "../Components/side_bar";
import TotalEvents from "../Components/total-events";
import TotalUsers from "../Components/total-users";
import UserStats from "../../../img/userstats.svg";
import "../CSS/admin-index.css";
import "../CSS/admin-dashboard.css";
import TotalActivity from "../Components/total-activity";
import NewUsers from "../Components/new-users";
import axios from "axios";
import AuthContext from "../../../Auth/AuthContext";

const AdminDashboard = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [userCount, setUserCount]=useState();
  const [organizerCount, setOrganizerCount]=useState();
  const [clientCount, setClientCount]=useState();
  const [account, setAccount]=useState();
  const { profile, isLoggedIn } = useContext(AuthContext);
  useEffect(()=>{
    const fetchUserCount= async()=>{
      const res= await axios.get(`${apiUrl}/api/admins/users/count/total`);
      console.log(res.data);
      setUserCount(res.data.organizersCount+res.data.clientsCount);
      console.log(userCount);
    }
    fetchUserCount();
  }, [userCount])



  const [lastWeekCount, setLastWeekCount]=useState();
  useEffect(()=>{
    const fetchLastWeekCount= async()=>{
      const res=await axios.get(`${apiUrl}/api/admins//users/count/joined-last-week`);
      setLastWeekCount(res.data);
      console.log(lastWeekCount);
    }
    fetchLastWeekCount();
  },[lastWeekCount])


  const [lastWeekEvents, setLastWeekEvents]=useState();
  const [totalEvents, setTotalEvents]=useState();
  useEffect(()=>{
    const fetchEventsStats= async()=>{
      const res =await axios.get(`${apiUrl}/api/admins/events/count/total&weekcount`);
      setLastWeekEvents(res.data.newCount);
      setTotalEvents(res.data.totalCount);
    }
    fetchEventsStats()
  },[lastWeekEvents])



  const [last10Users, setLast10Users]=useState([]);
  const [last10Loader, setLast10Loader]=useState(false);
  useEffect(()=>{
    const fetchLast10Users=async()=>{
      setLast10Loader(true)
      const res=await axios.get(`${apiUrl}/api/admins/users/last-10-joined`);
      setLast10Users(res.data);
      setLast10Loader(false);
      console.log(last10Users);
    }
    fetchLast10Users()
  },[])
  
  return (
    <div>
      <AdminNavigationBar setAccount={setAccount}/>
      <div className="admin-page">
        <SideBar activeBtn="dashboard" />
        <div className="admin-page-content">
          <div className="left-side">
            <div className="dashboard-cards">
              <ActiveUsers />
              <TotalUsers TotalUsers={userCount} lastWeek={lastWeekCount}/>
              <TotalEvents TotalEvents={totalEvents} lastWeek={lastWeekEvents}/>
            </div>
            <TotalActivity />
          </div>
          <div className="right-side">
            <img src={UserStats} alt="" />
            <NewUsers users={last10Users} loader={last10Loader} thisWeek={lastWeekCount}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
