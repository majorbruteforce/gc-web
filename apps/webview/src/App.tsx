import React from "react";
import './assets/css/global/page.css'
import SwiperOnboard from "./assets/pages/onboarding/onboard";
const App: React.FC = () => {
  return (
    <>
    <div className="canvas_mobile">
      <div className="mobile_view">
        <SwiperOnboard/>
      </div>
    </div>
    </>
  );
};

export default App;
