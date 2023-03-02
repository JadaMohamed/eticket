import React from "react";
import Navbar from "../../components/common/navbar";
import SubNavbar from "../../components/common/subnavbar";
import HeroSlider from "../../components/home/heroslider";
import LocalEvents from "../../components/home/localevents";
import FYEvents from "../../components/home/foryou_events";
import "./Home.css";

function Home() {
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
