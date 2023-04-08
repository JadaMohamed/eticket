import React from "react";
import '../../css/eror404.css';
import {useNavigate} from 'react-router-dom';

function Eror404() {
    const Nav = useNavigate();
    return (
        <main className="eror-page">
            <div className="eror-page-container">
            <h1>404</h1>
            <p id="errorText">O-o-oh! Page Not Found.</p>
            <div id="errorLink" onClick={()=>Nav('/home', {replace: true})}><div>Go Home</div></div>
        </div>
        </main>
    );
}

export default Eror404;