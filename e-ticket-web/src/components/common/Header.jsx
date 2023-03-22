import React, { useContext, useEffect } from "react";
import AuthContext from "../../Auth/AuthContext";
import OrNavigationBar from "../../organizer/components/navigation_bar";
import Navbar from "./navbar";
import SubNavbar from "./subnavbar";

const Header = () => {
  //   const { profile, isLoggedIn } = useContext(AuthContext);
  const { profile, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    console.log("from home");
    console.log(profile);
  }, [profile]);
  return (
    <>
      {profile?.account?.account_type == "organizer" ? (
        <OrNavigationBar />
      ) : (
        <>
          <Navbar />
          <SubNavbar />
        </>
      )}
    </>
  );
};

export default Header;
