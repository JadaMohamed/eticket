import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from './AuthContext';
export const ProtectAdmin = () => {
    const { profile } = useContext(AuthContext);

    if (profile) {
        const accountType = profile.account?.account_type;
        if (accountType === 'admin') {
            return <Outlet />;
        }
    } else {
        const userType = localStorage.getItem('usertype');
        if (userType === 'admin') {
            return <Outlet />;
        }
    }
    return <Navigate to="/" />;


};
