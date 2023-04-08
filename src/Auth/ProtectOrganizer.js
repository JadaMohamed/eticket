import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "./AuthContext";

export const ProtectOrganizer = () => {

  //****************************************************************************************/
  //now yes if the client or visiter wants to go to dashbord using link after changing the localstorage
  //it will go but once the profile of client is fetched it will go out of dashbord to home !!nice
  const { profile } = useContext(AuthContext);

  if (profile) {
    const accountType = profile.account?.account_type;
    if (accountType === 'organizer' || accountType === 'admin') {
      return <Outlet />;
    }
  } else {
    const userType = localStorage.getItem('usertype');
    if (userType === 'organizer' || userType === 'admin') {
      return <Outlet />;
    }
  }
  return <Navigate to="/" />;
};



