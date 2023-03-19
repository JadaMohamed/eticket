import React, { useState } from "react";
import CountdownDate from "../../../components/common/countdown";
import "../../css/create post form/validate_before_publishing.css";

const ValidateEventInfos = ({ previewSources, eventData }) => {
  const [selectedImage, setSelectedImage] = useState(previewSources[0]);
  return (
    <>
      <div className="row-section">
        <div className="left-side-row-section">
          <div className="title">How your event will look like</div>
          <div className="instructions">
            Preview your event before publishing it
          </div>
        </div>
      </div>
      <div className="preview-before-publish">
        <div className="left side">
          <div className="images">
            <div className="preview-image">
              <img src={selectedImage} alt="" />
            </div>
            <div className="select-image">
              {previewSources.map((img, key) => (
                <div
                  className="image"
                  key={key}
                  onClick={() => {
                    setSelectedImage(img);
                  }}
                >
                  <img src={img} />
                </div>
              ))}
            </div>
          </div>
          <div className="title">{eventData.eventTitle}</div>
          <div className="description">
            <div className="desc">
              <div className="label">Description</div>
              <span></span>
            </div>
            <div className="content">{eventData.description}</div>
          </div>
        </div>
        <div className="right side">
          <div className="row">
            <div className="row-title">Seat categories</div>
            <table>
              <tr>
                <th>Category name</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
              {eventData.categories.map((categ) => (
                <tr>
                  <td>{categ.name}</td>
                  <td>{categ.price} MAD</td>
                  <td>{categ.numSeats}</td>
                </tr>
              ))}
            </table>
          </div>
          <div className="row">
            <div className="row-title">Event category</div>
            <div className="categ">{eventData.eventCategory}</div>
          </div>
          <div className="row">
            <div className="row-title">Date & Address</div>
            <div className="date">
              <div className="countdown">
                <span class="material-symbols-outlined">hourglass_top</span>
                <CountdownDate date={eventData.date} />
              </div>
              <div className="static-date">
                ({eventData.date} {eventData.time})
              </div>
            </div>
            <div className="address">
              <span class="material-symbols-outlined">pin_drop</span>
              <div className="adr">
                {eventData.address1}, {eventData.address2}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ValidateEventInfos;
