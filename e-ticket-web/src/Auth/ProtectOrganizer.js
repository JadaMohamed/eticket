import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from './AuthContext';

export const ProtectOrganizer = () => {

    const { profile } = useContext(AuthContext);

    return (
        <>
            {profile && profile.account && (profile.account.account_type === 'org' || profile.account.account_type === 'admin') ? <Outlet/> : <Navigate to='/' />}
        </>
    );
};
