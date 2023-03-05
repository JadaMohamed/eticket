import React, { useState } from "react";
import "../../css/slide_element.css";
import { SwiperSlide } from "swiper/react";
import PreviewHot from "../../img/event-image.jpg";

const Slideelement = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="hot-event-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="preview-image-hot">
        {/* <img src={PreviewHot} alt="" /> */}
      </div>
      {isHovered && (
        <div className="btn">
          <div className="btn-otainer">FIND OUT MORE</div>
        </div>
      )}
    </div>
  );
};

export default Slideelement;
