import React from "react";
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

function HeroSlider() {
  return (
    <>
      <div className="heroslider-container">
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={20}
          freeMode={true}
          pagination={{ clickable: true }}
          modules={[FreeMode, Pagination, Autoplay]}
          autoplay={true}
          grabCursor={true}
          className="mySwiper"
        >
          <SwiperSlide>
            <Slideelement />
          </SwiperSlide>
          <SwiperSlide>
            <Slideelement />
          </SwiperSlide>
          <SwiperSlide>
            <Slideelement />
          </SwiperSlide>
          <SwiperSlide>
            <Slideelement />
          </SwiperSlide>
          <SwiperSlide>
            <Slideelement />
          </SwiperSlide>
          <SwiperSlide>
            <Slideelement />
          </SwiperSlide>
          <SwiperSlide>
            <Slideelement />
          </SwiperSlide>
          <SwiperSlide>
            <Slideelement />
          </SwiperSlide>
          <SwiperSlide>
            <Slideelement />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
export default HeroSlider;
