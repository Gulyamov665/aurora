import React from "react";
import animation from "../files/delivery.json";
import Lottie from "react-lottie-player/dist/LottiePlayerLight";

interface Delivery {
  size: number;
}

export const Delivery: React.FC<Delivery> = ({ size }) => {
  return (
    <div>
      <div style={{ width: size, height: size, margin: "0 auto" }}>
        <Lottie animationData={animation} loop={true} play />
      </div>
    </div>
  );
};
