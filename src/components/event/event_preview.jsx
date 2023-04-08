import React, { useContext, useEffect, useState } from "react";
import "../../css/event_preview.css";
import { Image } from "cloudinary-react";
import CountdownDate from "../common/countdown";
import axios from "axios";
import AuthContext from "../../Auth/AuthContext";
import { useNavigate } from "react-router-dom";

function EventPreview(props) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { profile } = useContext(AuthContext);
  const [quantity, setQuantity] = useState(1);
  const [hovred, setHovred] = useState(false);
  const [seatCategory, setseatCategory] = useState();
  const [price, setPrice] = useState();
  const [max, setMax] = useState();
  useEffect(() => {
    setPrice(props.event.SeatCategory[0].type_price);
    setMax(props.event.SeatCategory[0].number_avialable);
  }, [props.event]);
  useEffect(() => {
    setPrice(
      props.event?.SeatCategory.find(
        (val) => val?.seat_categ_id === parseInt(seatCategory?.seat_categ_id)
      )?.type_price * quantity
    );
  }, [seatCategory, quantity]);
  useEffect(() => {
    setMax(
      props.event?.SeatCategory.find(
        (val) => val?.seat_categ_id === parseInt(seatCategory?.seat_categ_id)
      )?.number_avialable
    );
  }, [seatCategory]);
  const Nav = useNavigate();
  const [selectedImage, setSelectedImage] = useState(
    props.event.Event_Images[0].img_url
  );
  const incrementQuantity = () => {
    if (quantity < max) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      console.log(quantity);
    }
  };
  useEffect(() => {
    console.log(props.event);
  });
  useEffect(() => {
    const intervalId = setInterval(() => {
      // setSelected(["foo", "bar", "baz"]); // update selected array every 3 seconds
    }, 3000);
    return () => clearInterval(intervalId); // clear the interval when the component unmounts
  }, []);

  const [images, setImages] = useState(props.event.Event_Images);
  useEffect(() => {
    console.log("imgs " + images);
  }, [images]);
  useEffect(() => {
    setSelectedImage(props.event.Event_Images[0].img_url);
  }, [images]);

  const handleAddToCart = async () => {
    console.log("start add to cart in or by");
    console.log(props);
    console.log(props.event.event_id);
    console.log(profile.user.client_id);
    try {
      const response = await axios.post(
        `${apiUrl}/api/orders-cart/add-to-cart`,
        {
          quantity: 1,
          event_id: props.event.event_id,
          org_id: props.event.org_id,
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

  return (
    <div className="event-preview">
      <div className="event-preview-container">
        <div className="leftside">
          <div
            className="images"
            onMouseEnter={() => {
              setHovred(true);
            }}
            onMouseLeave={() => {
              setHovred(false);
            }}
          >
            <div className="selected-image">
              <Image cloudName="djjwswdo4" publicId={selectedImage} />
            </div>
            <div className="image-slider">
              {props.event.Event_Images.map((img) => (
                <div
                  className="image"
                  onClick={() => {
                    setSelectedImage(img.img_url);
                  }}
                >
                  <Image cloudName="djjwswdo4" publicId={img.img_url} />
                </div>
              ))}
            </div>
          </div>
          <div className="event-title">{props.event.title}</div>
          <div className="description">
            <div className="title">
              <span>Description</span>
              <span className="line"></span>
            </div>
            <div className="description-content">{props.event.description}</div>
          </div>
        </div>
        <div className="right-side">
          <div className="right-side-container">
            <div className="data-collector">
              <div className="label">Seat Category</div>
              <select
                name="seat-category"
                id="seat-categories"
                value={props.event.SeatCategory.seat_categ_id}
                onChange={(e) =>
                  setseatCategory(
                    props.event?.SeatCategory.find(
                      (val) => val?.seat_categ_id === parseInt(e.target.value)
                    )
                  )
                }
              >
                {props.event?.SeatCategory.map((val) => (
                  <option key={val?.seat_categ_id} value={val?.seat_categ_id}>
                    {val?.type_name} {val?.type_price}MAD
                  </option>
                ))}
              </select>
            </div>
            <div className="quantity-collector">
              <div className="quantity">
                <div className="label">Quantity</div>
                <div className="quantity-selector">
                  <div className="inc btn" onClick={incrementQuantity}>
                    <span>+</span>
                  </div>
                  <div className="selected-quant">{quantity}</div>
                  <div className="decr btn" onClick={decrementQuantity}>
                    <span>-</span>
                  </div>
                </div>
              </div>
              <div className="quantity-statu">In Stock</div>
            </div>
            <div className="event-infos">
              <div className="local inf">
                <span className="material-symbols-outlined">location_on</span>
                <div className="data">{props.event.location}</div>
              </div>
              <div className="date inf">
                <span className="material-symbols-outlined">hourglass_top</span>

                <div className="data">
                  <CountdownDate date={props.event.start_time} />
                </div>
              </div>
            </div>
            <div className="total-price">
              <div className="label">Total Price:</div>
              <div className="calculated-price">
                {price} <span>MAD</span>
              </div>
            </div>
            <di className="btns">
              <div className="add-tocart-btn btn" onClick={handleAddToCart}>
                {" "}
                Add to Cart
              </div>
              {/* <div className="buy-now-btn btn"> Buy Now</div> */}
              <div className="instruction">
                <span className="material-symbols-outlined">lock</span>
                Secure transaction
              </div>
            </di>
            <div className="organizer">
              Organized by{" "}
              <span onClick={() => Nav(`/organizer/${props.id}`)}>
                {props.event.Organizer.Account.first_name}{" "}
                {props.event.Organizer.Account.last_name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EventPreview;
