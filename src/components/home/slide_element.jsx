import React, { useState } from "react";
import "../../css/slide_element.css";
import { SwiperSlide } from "swiper/react";
import PreviewHot from "../../img/event-image.jpg";
import { useNavigate } from "react-router-dom";
import { Image } from "cloudinary-react";

const Slideelement = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const Nav = useNavigate();
  return (
    <div
      className="hot-event-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="preview-image-hot">
        <Image cloudName="djjwswdo4" publicId={props.event.brand_url} />
      </div>
      {isHovered && (
        <div
          className="btn"
          onClick={() => {
            Nav(`/events/${props.event.event_id}`);
          }}
        >
          <div className="btn-otainer">FIND OUT MORE</div>
        </div>
      )}
    </div>
  );
};

export default Slideelement;
