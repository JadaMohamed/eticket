import React, { useState } from "react";
import "./Slide.css";
import { useNavigate } from "react-router-dom";
import { Image } from "cloudinary-react";

const SlideElement = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const Nav = useNavigate();
  return (
    <div
      className="justify-center flex select-none w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full">
        <Image
          className="w-full rounded-lg select-none aspect-video"
          cloudName="djjwswdo4"
          publicId={props.event.brand_url}
        />
      </div>
      {isHovered && (
        <div
          className={`fixed hover:bg-secondary-500 z-20 text-white bg-secondary-400 py-1 px-3 text-sm font-medium bottom-5 rounded-lg shadow-lg cursor-pointer duration-300 ${
            isHovered ? "showButton" : "hideButton"
          }`}
          onClick={() => {
            Nav(`/events/${props.event.event_id}`);
          }}
        >
          FIND OUT MORE
        </div>
      )}
    </div>
  );
};

export default SlideElement;
