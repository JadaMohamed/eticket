import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "../../img/success.png";
import styles from "./styles.module.css";
import Eror404 from "../common/eror404";
import logo from "./../../img/logo.svg";


const EmailVerify = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [validUrl, setValidUrl] = useState(false);
    const [typeuser, setTypeuser] = useState("");
    const { eticketjwt } = useParams();
    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const url = `${apiUrl}/api/user/verify-email/${eticketjwt}`;
                const { data } = await axios.get(url, { withCredentials: true });
                console.log(data);
                if (data) {
                    setValidUrl(true);
                    setTypeuser(data.userType)
                }
            } catch (error) {
                console.log(error);
            }
        };
        verifyEmailUrl();
    }, [eticketjwt]);


    useEffect(() => {
        console.log('typeuser')
        console.log(typeuser)
    }, [typeuser])



    if (eticketjwt === "checkemail") {
        return (
            <div className={styles.parent}>
                <div className={styles.container}>
                    <h3> We just sent you an email with a verification link. Please check your inbox (and spam folder just in case)
                        and click on the link to verify your email address. Once you've done that, you'll be all set to explore everything
                        our platform has to offer. We can't wait to have you onboard!</h3>
                    <a href="https://mail.google.com/mail/u/0/#spam">
                        <button className={styles.green_btn}>Email</button>
                    </a>
                </div>
            </div>
        )
    } else {
        return (
            <>
                {validUrl ? (
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
                        <div className={styles.container}>
                            <img src={success} alt="success_img" className={styles.success_img} />
                            <h1>Email verified successfully</h1>
                            {typeuser === 'client' && <a href="/"> <button className={styles.green_btn}>Back to Home</button></a>}
                            {typeuser === 'organizer' && <Link to="/organizer/dashboard"> <button className={styles.green_btn}>My dashboard</button> </Link>}
                        </div>
                    </>
                ) : (
                    <Eror404 />
                )}
            </>
        );
    }
};

export default EmailVerify;
