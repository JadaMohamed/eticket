import React, { useContext } from 'react';
import {  Navigate, Outlet } from 'react-router-dom';
import AuthContext from './AuthContext';

export const ProtectClient = () => {
    const { profile } = useContext(AuthContext);

            if (profile) {
            const accountType = profile.account?.account_type;
            if (accountType === 'client' || accountType === 'admin') {
                return <Outlet />;
            }
        } else {
            const userType = localStorage.getItem('usertype');
            if (userType === 'client' || userType === 'admin') {
                return <Outlet />;
            }
        }
        return <Navigate to="/" />;
    
};


