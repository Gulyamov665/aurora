import React from "react";
import animation from "../files/waitconfirmation.json";
import Lottie from "react-lottie-player/dist/LottiePlayerLight";

interface WaitProps {
  size: number;
}

export const Wait: React.FC<WaitProps> = ({ size }) => {
  return (
    <div>
      <div style={{ width: size, height: size, margin: "0 auto" }}>
        <Lottie animationData={animation} loop={true} play />
      </div>
    </div>
  );
};
