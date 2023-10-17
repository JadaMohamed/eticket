import React, { useContext, useEffect } from "react";
import AuthContext from "../../../Auth/AuthContext";
import TopSellsSlider from "./sub/TopSellsSlider";
import ForYouEvents from "./sub/ForYouEvents";
import LocalEvents from "./sub/LocalEvents";

function Home() {
  const { profile, isLoggedIn } = useContext(AuthContext);
  useEffect(() => {
    document.title = "E-Ticket";
  }, []);
  return (
    <div>
      <TopSellsSlider />
      {isLoggedIn ? <LocalEvents city={profile?.user?.city} /> : ""}
      <ForYouEvents />
    </div>
  );
}
export default Home;
