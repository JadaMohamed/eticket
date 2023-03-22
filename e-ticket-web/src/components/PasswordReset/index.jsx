import React, { useEffect, useState } from 'react';
import './style.css';
import logo from "./../../img/logo.svg";
import { Link, useParams, } from "react-router-dom";
import axios from "axios";
import Eror404 from '../common/eror404';


function PasswordResetForm() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const { eticketjwt } = useParams();
    const [validUrl, setValidUrl] = useState(true);
    const [emailSended, setemailSended] = useState(false);
    const [typeuser, setTypeuser] = useState("");


    useEffect(() => {
        const verifytoken = async () => {
            try {
                const url = `${apiUrl}/api/user/verifytoken/${eticketjwt}`;
                const { data } = await axios.get(url, { withCredentials: true });
                // console.log(data);
                if (data) {
                    setValidUrl(true);
                }
            } catch (error) {
                setValidUrl(false);
                console.log(error);
            }
        };
        verifytoken();
    }, [eticketjwt]);

    const [email, setEmail] = useState("");
    const sendEmailResetPassword = async () => {
        setMessage('');
        try {
            if (!email) {
                setMessage("enter your email please to reset password")
                return;
            }
            const url = `${apiUrl}/api/user/reset-password-mail`;
            const { data } = await axios.post(url, { email }, { withCredentials: true });
            // console.log(data);
            if (data.msg) {
                setMessage(data.msg);
                setemailSended(true);
            }
        } catch (error) {
            console.log(error);
        }
    };


    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');
        if (!password) {
            setMessage('Type new password');
            return;
        } else if (password.trim().length < 8) {
            setMessage('password should containe at lest 8 characters');
            return;
        }
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        try {
            const url = `${apiUrl}/api/user/reset-password/${eticketjwt}`;
            const { data } = await axios.post(url, { password, confirmPassword }, { withCredentials: true });
            // console.log(data);
            if (data) {
                setMessage(`Password reset successful`);
                setTypeuser(data.userType)
            }
        } catch (error) {
            if (error.response.data) {
                setMessage(error.response.data.errors[0]);
            } else {
                console.log(error);
            }
        }
    };

    if (eticketjwt === "msg") {
        return (
            <>
                <nav className="nav">
                    <div className="nav-container">
                        <img
                            src={logo}
                            alt="e-tickets.logo"
                            className="Logo_"
                        />
                    </div>
                </nav>
                <div className="msg-email">
                    <h3> Enter your email to reset password if it is in our database you will recive a link</h3>
                    <div className='input-email'>
                        <label>
                            email:
                            <input
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </label>
                    </div>
                    <div className='btns'>
                        <div className="error-message">{message}</div>
                        {!emailSended && <button className="green_btn" onClick={sendEmailResetPassword}>send email</button>}
                        <a href="https://mail.google.com/mail/u/0/#inbox">
                            <button className="green_btn">check Email</button>
                        </a>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                {validUrl ? (
                    <>
                        <div className="password-reset-form">
                            <nav className="nav">
                                <div className="nav-container">
                                    <img
                                        src={logo}
                                        alt="e-tickets.logo"
                                        className="Logo_"
                                    />
                                </div>
                            </nav>
                            <h1>Password Reset</h1>
                            <form onSubmit={handleSubmit}>
                                <label>
                                    New Password:
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                    />
                                </label>
                                <label>
                                    Confirm Password:
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(event) => setConfirmPassword(event.target.value)}
                                    />
                                </label>
                                <div className="error-message">{message}</div>
                                {!typeuser && <button type="submit">Reset Password</button>}
                            </form>
                            {typeuser === 'client' && <a href="/"> <button className="green_btn">Back to Home</button></a>}
                            {typeuser === 'organizer' && <Link to="/organizer/dashboard"> <button className="green_btn">My dashboard</button> </Link>}
                        </div>
                    </>
                ) : (
                    <Eror404 />
                )}
            </>
        );
    }
}

export default PasswordResetForm;
