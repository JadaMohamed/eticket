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
    const [isLoading, setIsLoading] = useState(true);
    const { eticketjwt } = useParams();
    useEffect(() => {
        const verifyEmailUrl = async () => {
            if (eticketjwt ==="checkemail"){
                return;
            }
            try {
                const url = `${apiUrl}/api/user/verify-email/${eticketjwt}`;
                const { data } = await axios.get(url, { withCredentials: true });
                if (data) {
                    setIsLoading(false)
                    setValidUrl(true);
                    setTypeuser(data.userType)
                }
            } catch (error) {
                setIsLoading(false)
                console.log(error);
            }
        };
        verifyEmailUrl();
    }, [eticketjwt]);


    if (eticketjwt === "checkemail") {
        return (
            <div className={styles.parent}>
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
                    <h3> We just sent you an email with a verification link. Please check your inbox (and spam folder just in case)
                        and click on the link to verify your email address. Once you've done that, you'll be all set to explore everything
                        our platform has to offer. We can't wait to have you onboard!</h3>
                    <a href="https://mail.google.com/mail/u/0/#inbox">
                        <button className={styles.green_btn}>Email</button>
                    </a>
                </div>
            </div>
        )
    } else if(isLoading){
        return (
            <div className={styles.parent}>
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
                    <h1>Loading ...!</h1>       
                </div>
            </div>
        )

    }else{
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
