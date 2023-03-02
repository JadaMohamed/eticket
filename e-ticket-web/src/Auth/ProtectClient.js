import React, { useContext } from 'react';
import {  Outlet } from 'react-router-dom';
import AuthContext from './AuthContext';

export const ProtectClient = () => {
    const { profile } = useContext(AuthContext);
    
    // This made a problem with the Cart and MyTickets pages, because no account users can't access cart and mytickets pages
    // no account users aren't supposed to access myticets page anyway so we show an error message
    // when they don't have access instead, therefore i think ProtectClient is pointless ?
    

    // Allow access for both users and admins
    if ((profile && profile.account) && (profile.account.account_type === "client")) {
        return <Outlet />;
    }

    
    // Redirect to home for all other users

    return <Outlet />;
        
};


