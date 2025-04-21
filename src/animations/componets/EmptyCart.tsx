import React from "react";
import animation from "../files/emptycart.json";
import Lottie from "react-lottie-player/dist/LottiePlayerLight";

export const EmptyCart: React.FC = () => {
  return (
    <div>
      <div style={{ width: 400, height: 400, margin: "0 auto" }}>
        <Lottie animationData={animation} loop={true} play />
      </div>
    </div>
  );
};
