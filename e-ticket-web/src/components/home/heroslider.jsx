import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
// import required modules
import { Autoplay, FreeMode, Pagination } from "swiper";

import "../../css/heroslider.css";
import Slideelement from "./slide_element";
import Axios from "axios";

function HeroSlider() {
  const [events, setEvents] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const getEvents = async () => {
    try {
      const response = await Axios.get(`${apiUrl}/api/events/topsalesevents`);
      setEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getEvents();
    console.log(events);
  }, []);
  return (
    <>
      <div className="heroslider-container">
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={20}
          freeMode={true}
          pagination={{ clickable: true, color: "red" }}
          modules={[FreeMode, Pagination, Autoplay]}
          autoplay={true}
          grabCursor={true}
          className="mySwiper"
        >
          {events.map((event) => (
            <SwiperSlide key={event.event_id}>
              <Slideelement event={event} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
export default HeroSlider;
