import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// swiper_js styles 
import 'swiper/css';
import 'swiper/css/navigation';

import '../../css/onboard/onboard.css';

import { Navigation } from 'swiper/modules';

const SwiperOnboard: React.FC = () => {
  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
      <div className="onboard_header">
        <h2>INTRODUCING FOR THE FIRST TIME</h2>
      </div>
    </>
  );
};

export default SwiperOnboard;
