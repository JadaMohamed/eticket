import React, { useEffect, useState } from "react";
import "../../css/event_preview.css";
import { Image } from "cloudinary-react";
import CountdownDate from "../common/countdown";

function EventPreview(props) {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      console.log(quantity);
    }
  };
  const [images, setImages] = useState(props.event.Event_Images);
  useEffect(() => {
    console.log("imgs " + images);
  }, [images]);
  return (
    <div className="event-preview">
      <div className="event-preview-container">
        <div className="leftside">
          <div className="images">
            <div className="selected-image">
              <Image
                cloudName="djjwswdo4"
                publicId={props.event.Event_Images[0].img_url}
              />
            </div>
            <div className="image-slider">
              {props.event.Event_Images.map((img) => (
                <div className="image">
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
              <select name="seat-category" id="seat-categories">
                <option value="bas">Basic 200MAD</option>
                <option value="vip">VIP 300MAD</option>
                <option value="bst">Back Stage 500MAD</option>
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
                200 <span>MAD</span>
              </div>
            </div>
            <di className="btns">
              <div className="add-tocart-btn btn"> Add to Cart</div>
              <div className="buy-now-btn btn"> Buy Now</div>
              <div className="instruction">
                <span className="material-symbols-outlined">lock</span>
                Secure transaction
              </div>
            </di>
            <div className="organizer">
              Organized by <span>{props.event.org_id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EventPreview;
