import React from "react";
import "../../css/card.css";
import { useNavigate } from "react-router-dom";
import CountdownDate from "../common/countdown";
// import Image from "../../img/event-image.jpg";
import Expired from "../../img/end.svg";
import { Image } from "cloudinary-react";

function Card(props) {
  const Nav = useNavigate();
  const handleAdd = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // Get existing cart or create an empty array
    const productId = props.eventid;
    let productExists = false;
    // Check if product is already in the cart
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].eventId === productId) {
        cart[i].quantity++;
        cart[i].totalPrice += 99;
        productExists = true;
        break;
      }
    }
    // Add product to cart if it doesn't exist
    if (!productExists) {
      const cartObj = {
        imagePublicId: props.image,
        date: props.date,
        address: props.location,
        title: props.title,
        eventId: productId,
        quantity: 1,
        eventCategory: props.category,
        seatCategory: "Basic",
        totalPrice: 99,
      };
      if (!Array.isArray(cart)) {
        cart = [cartObj];
      } else {
        cart.push(cartObj);
      }
    }
    // Update cart in local storage
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  const isExpired = new Date(props.date) < new Date();
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
              <div className="add-to-cart-btn" onClick={handleAdd}>
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
