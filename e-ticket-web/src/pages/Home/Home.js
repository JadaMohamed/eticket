import React from "react";
import Navbar from "../../components/common/navbar";
import SubNavbar from "../../components/common/subnavbar";
import HeroSlider from "../../components/home/heroslider";
import LocalEvents from "../../components/home/localevents";
import FYEvents from "../../components/home/foryou_events";
import "./Home.css";
// import AuthContext from "../../Auth/AuthContext";

function Home() {
  // const { profile } = useContext(AuthContext);

  // console.log("hom: " + profile.accout ? profile.accout : "");
  return (
    <div>
      <Navbar />
      <SubNavbar />
      <HeroSlider />
      <LocalEvents />
      <FYEvents />
    </div>
  );
}
export default Home;
