import React, { useContext } from "react";
import "../../css/card.css";
import { useNavigate } from "react-router-dom";
import CountdownDate from "../common/countdown";
// import Image from "../../img/event-image.jpg";
import Expired from "../../img/end.svg";
import { Image } from "cloudinary-react";
import axios from "axios";
import AuthContext from "../../Auth/AuthContext";

function Card(props) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { profile } = useContext(AuthContext);
  const Nav = useNavigate();

  const isExpired = new Date(props.date) < new Date();
  const handleAddToCart = async () => {
    console.log('start add to cart');
    try {
      const response = await axios.post(
        `${apiUrl}/api/orders-cart/add-to-cart`,
        {
          quantity: 1,
          org_id: parseInt(props.orgid),
          event_id: props.eventid,
          client_id: profile.user.client_id,
        },
        { withCredentials: true, }
      );
      if (response) {
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="cardevent" key={props.id}>
      <div
        className="previewimage cta"
        onClick={() => Nav(`/events/${props.eventid}`, { replace: false })}
      >
        {isExpired ? <img src={Expired} className="expiredimage" /> : ""}
        <Image cloudName="djjwswdo4" publicId={props.image} />
        {/* <img src={Image} alt="" /> */}
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
                <span className="price">{props.price ? props.price : 99}</span>
                <span className="curr">MAD</span>
              </div>
            </div>
            <div className="action">
              <div className="add-to-cart-btn" onClick={handleAddToCart}>
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

export default Card;
