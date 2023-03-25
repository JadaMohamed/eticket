import React, { useEffect, useState } from "react";
import "../../css/eventcard_cart.css";
import CountdownDate from "../common/countdown";
import { Image } from "cloudinary-react";
import Axios from "axios";

function EventCard_Cart(props) {
  const [quantity, setQuantity] = useState(props.quantity);
  const [isSelected, setSelected] = useState(
    props.selectedCards.find((value) => value === props.eventId) ? true : false
  );
  const [seatCategories, setSeatCategories] = useState();
  const [selectedSeat, setSelectedSeat] = useState();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [price, setPrice] = useState(0);
  const getSeatCategories = async () => {
    try {
      const response = await Axios.get(
        `${apiUrl}/api/seat-categories/event/${props.eventId}`,
        {
          withCredentials: true,
        }
      );
      setSeatCategories(response.data);
      setSelectedSeat(response.data[0]);
      setPrice(quantity * response?.data[0]?.type_price);
      props.totalPriceHandler(price, quantity * response?.data[0]?.type_price);
      // console.log("Seat Categories : ", response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const triggerSelect = () => {
    if (!isSelected) {
      props.setCardSelected(props.eventId);
    } else {
      props.setCardUnSelected(props.eventId);
    }
    setSelected((prev) => !prev);
  };

  useEffect(() => {
    if (
      props.selectedCards.find((value) => value === props.eventId) != undefined
    ) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [props.selectedCards]);

  useEffect(() => {
    getSeatCategories();
  }, []);

  const handleSeatChange = (e) => {
    setSelectedSeat(
      seatCategories.find((val) => val.seat_categ_id == e.target.value)
    );
    quantitySetter(
      1,
      seatCategories.find((val) => val.seat_categ_id == e.target.value)
    );
  };

  const quantitySetter = (val, selectedS) => {
    const storedEvents = JSON.parse(localStorage.getItem("cart") || "[]");
    const index = storedEvents.findIndex(
      (event) => event.eventId === props.eventId
    );
    storedEvents[index].quantity = val;
    setQuantity(storedEvents[index].quantity);
    setPrice(storedEvents[index].quantity * selectedS.type_price);
    props.totalPriceHandler(
      price,
      storedEvents[index].quantity * selectedS.type_price
    );
    localStorage.setItem("cart", JSON.stringify(storedEvents));
  };

  const incrementQuantity = () => {
    const storedEvents = JSON.parse(localStorage.getItem("cart") || "[]");
    const index = storedEvents.findIndex(
      (event) => event.eventId === props.eventId
    );
    if (
      index !== -1 &&
      selectedSeat.number_avialable > storedEvents[index].quantity
    ) {
      storedEvents[index].quantity++;
      setQuantity(storedEvents[index].quantity);
      setPrice(storedEvents[index].quantity * selectedSeat.type_price);
      props.totalPriceHandler(
        price,
        storedEvents[index].quantity * selectedSeat.type_price
      );
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
      setPrice(storedEvents[index].quantity * selectedSeat.type_price);
      props.totalPriceHandler(
        price,
        storedEvents[index].quantity * selectedSeat.type_price
      );
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
            checked={isSelected ? "checked" : ""}
            onChange={triggerSelect}
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

              <select
                name="seat-category"
                id="seat-categories"
                onChange={handleSeatChange}
                value={selectedSeat?.seat_categ_id}
              >
                {seatCategories &&
                  seatCategories.map((val) => {
                    return (
                      <option key={val.seat_categ_id} value={val.seat_categ_id}>
                        {val.type_name} {val.type_price}MAD
                      </option>
                    );
                  })}
              </select>
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
            <div className="title-pricing">Total price</div>
            <div className="total-price">
              {isNaN(price) ? 0 : price}
              <span>MAD</span>
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
