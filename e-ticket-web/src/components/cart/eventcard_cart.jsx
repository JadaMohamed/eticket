import React, { useEffect, useState } from "react";
import "../../css/eventcard_cart.css";
import CountdownDate from "../common/countdown";
import { Image } from "cloudinary-react";

function EventCard_Cart(props) {
  const [quantity, setQuantity] = useState(props.quantity);

  const incrementQuantity = () => {
    const storedEvents = JSON.parse(localStorage.getItem("cart") || "[]");
    const index = storedEvents.findIndex(
      (event) => event.eventId === props.eventId
    );
    if (index !== -1) {
      storedEvents[index].quantity++;
      setQuantity(storedEvents[index].quantity);
      localStorage.setItem("cart", JSON.stringify(storedEvents));
    }
  };

  const decrementQuantity = () => {
    const storedEvents = JSON.parse(localStorage.getItem("cart") || "[]");
    const index = storedEvents.findIndex(
      (event) => event.eventId === props.eventId
    );
    if (index !== -1 && storedEvents[index].quantity > 1) {
      storedEvents[index].quantity--;
      setQuantity(storedEvents[index].quantity);
      localStorage.setItem("cart", JSON.stringify(storedEvents));
    }
  };
  useEffect(() => {
    const currentQuantity = parseInt(localStorage.getItem(props.eventId));
    if (currentQuantity) {
      setQuantity(currentQuantity);
    }
  }, [props.eventId]);
  return (
    <div className="event-card-cart">
      <div className="event-card-cart-container">
        <div className="event-infos">
          <input
            type="checkbox"
            name="selected-product"
            className="more-event-on-mobile"
          />
          <div className="preview-image">
            <Image cloudName="djjwswdo4" publicId={props.image} />
          </div>
          <div className="event-inf">
            <div className="event-title">{props.title}</div>
            <div className="local inf">
              <span className="material-symbols-outlined">location_on</span>
              {props.location}
            </div>
            <div className="date inf">
              <span className="material-symbols-outlined">hourglass_top</span>
              <CountdownDate date={props.date} />
            </div>
            <div className="event-category">{props.eventCategory}</div>
          </div>
        </div>
        <div className="shopping-infos">
          <div className="slecting-cat-quan">
            <div className="seat-category">
              <span className="seat-static-title">Category : </span>
              {props.seatCategory}
            </div>
            <div className="quantity">
              <span
                className="decrement btn"
                title="Decrement"
                onClick={decrementQuantity}
              >
                -
              </span>
              <span className="quantity-to-set">{quantity}</span>
              <span
                className="increment btn"
                title="Increment"
                onClick={incrementQuantity}
              >
                +
              </span>
            </div>
          </div>
          <div className="pricing">
            <div className="title-pricing">Total Price :</div>
            <div className="total-price">
              00<span>MAD</span>
            </div>
          </div>
          <div className="actions" title="More events">
            <input
              type="checkbox"
              name="selected-product"
              className="active-on-mobile"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard_Cart;
