import React from "react";
import '../src/assets/css/global/page.css'
import LoginApp from "./assets/pages/auth/login";

const App: React.FC = () => {
  return (
    <>
    <div className="canvas_mobile">
      <div className="mobile_view">
        <LoginApp/>
      </div>
    </div>
    </>
  );
};

export default App;
