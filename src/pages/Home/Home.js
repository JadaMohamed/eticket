import React, { useContext, useEffect } from "react";
import Navbar from "../../components/common/navbar";
import SubNavbar from "../../components/common/subnavbar";
import HeroSlider from "../../components/home/heroslider";
import LocalEvents from "../../components/home/localevents";
import FYEvents from "../../components/home/foryou_events";
import "./Home.css";
import AuthContext from "../../Auth/AuthContext";
import Header from "../../components/common/Header";

function Home() {
  const { profile, isLoggedIn } = useContext(AuthContext);
  useEffect(() => {
    document.title = 'E-Ticket';
  }, []);
  return (
    <div>
      <Navbar />
      <SubNavbar />
      <HeroSlider />
      {isLoggedIn ? <LocalEvents city={profile?.user?.city} /> : ""}
      <FYEvents />
    </div>
  );
}
export default Home;
