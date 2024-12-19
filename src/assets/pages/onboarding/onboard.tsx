import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import "../../css/onboard/onboard.css";
import OnboardingLast from "./onboard_last"; 

const SwiperOnboard: React.FC = () => {
    const swiperRef = useRef<Swiper | null>(null);
    const [isLastSlide, setIsLastSlide] = useState(false);
    const [showLastScreen, setShowLastScreen] = useState(false);

    const handleNext = (): void => {
        if (isLastSlide) {
            setShowLastScreen(true)
        } else if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideNext();
        }
    };

    const onSlideChange = (swiper: null): void => {
        setIsLastSlide(swiper.isEnd);
    };

    if (showLastScreen) {
        return <OnboardingLast />;
    }

    return (
        <div className="onboard_wrapper">
            <div>
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper" ref={swiperRef} onSlideChange={onSlideChange}>
                    <SwiperSlide>
                        <img src="images/onboard/1.png" alt="Slide 1" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="images/onboard/2.png" alt="Slide 2" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="images/onboard/3.png" alt="Slide 3" />
                    </SwiperSlide>
                </Swiper>
                <div className="onboard_header">
                    <h1>INTRODUCING FOR THE FIRST TIME</h1>
                    <p>The all-new grand championship app that will update your score like never before</p>
                </div>
            </div>
            <div className="crousal_next">
                <button onClick={handleNext}>Next</button>
            </div>
            <div className="skip_button">
                <a onClick={() => setShowLastScreen(true)} className="skip_button_link"> SKIP → </a>
            </div>
        </div>
    );
};

export default SwiperOnboard;
