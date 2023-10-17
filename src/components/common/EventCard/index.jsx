import React, { useContext, useState } from "react";
import "../../css/card.css";
import { useNavigate } from "react-router-dom";
import CountdownDate from "../common/countdown";
import Expired from "../../img/end.svg";
import { Image } from "cloudinary-react";
import axios from "axios";
import AuthContext from "../../Auth/AuthContext";
import Alert from "../common/alert";

function EventCard(props) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { profile } = useContext(AuthContext);
  const Nav = useNavigate();
  const isExpired = new Date(props.date) < new Date();
  const handleAddToCart = async () => {
    if (!profile) {
      setAlertParams({
        color: "orange",
        msg: "Please Sign in to manage your cart",
        icon: "error",
      });
      setAlert(true);
      return;
    }
    if (isExpired) {
      return;
    }
    try {
      const response = await axios.post(
        `${apiUrl}/api/orders-cart/add-to-cart`,
        {
          quantity: 1,
          org_id: parseInt(props.orgid),
          event_id: props.eventid,
          client_id: profile.user.client_id,
        },
        { withCredentials: true }
      );
      if (response) {
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const [alert, setAlert] = useState(false);
  const [alertParams, setAlertParams] = useState({
    color: "",
    msg: "",
    icon: "",
  });
  return (
    <div className="cardevent" key={props.id}>
      <Alert
        color={alertParams.color}
        msg={alertParams.msg}
        icon={alertParams.icon}
        setAlert={setAlert}
        alert={alert}
      />
      <div
        className="previewimage cta"
        onClick={() => Nav(`/events/${props.eventid}`, { replace: false })}
      >
        {isExpired ? (
          <div class="ribbon ribbon-top-right">
            <span>ENDED</span>
          </div>
        ) : (
          ""
        )}
        <Image cloudName="djjwswdo4" publicId={props.image} />

        {/* <img src={props.image} alt="" /> */}
      </div>
      <div className="event-infos">
        <div className="infos-container">
          <div
            className="event-title cta"
            onClick={() => Nav(`/events/${props.eventid}`, { replace: false })}
          >
            {props.title}
          </div>
          <div className="local inf cta">
            <span className="material-symbols-outlined">location_on</span>
            {props.location}
          </div>
          <div className="date inf cta">
            <span className="material-symbols-outlined">hourglass_top</span>

            {isExpired ? (
              <div className="calculated-date expired">
                <span>0</span> d <span>0</span> h <span>0 </span>
                min <span>0</span> sec
              </div>
            ) : (
              <CountdownDate date={props.date} />
            )}
          </div>
          <div className="event-category">{props.category}</div>
          <div className="shopping">
            <div className="priceing">
              <span className="start-at">Start at</span>
              <div className="eventprice">
                <span className="price">{props.price}</span>
                <span className="curr">MAD</span>
              </div>
            </div>
            <div className="action">
              <div
                className={`add-to-cart-btn ${isExpired ? "disactivated" : ""}`}
                onClick={handleAddToCart}
              >
                <span className="material-symbols-outlined">
                  add_shopping_cart
                </span>
                ADD TO CART
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
