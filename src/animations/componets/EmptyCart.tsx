import React from "react";
import animation from "../files/emptycart2.json";
import Lottie from "react-lottie-player/dist/LottiePlayerLight";

export const EmptyCart: React.FC = () => {
  return (
    <div>
      <div style={{ width: 200, height: 200, margin: "0 auto" }}>
        <Lottie animationData={animation} loop play={true} />
      </div>
    </div>
  );
};
