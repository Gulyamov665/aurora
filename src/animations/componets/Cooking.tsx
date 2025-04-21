import React from "react";
import animation from "../files/cooking.json";
import Lottie from "react-lottie-player/dist/LottiePlayerLight";

interface CookingProps {
  size: number;
}

export const Cooking: React.FC<CookingProps> = ({ size }) => {
  return (
    <div>
      <div style={{ width: size, height: size, margin: "0 auto", position: "absolute", top: 0 }}>
        <Lottie animationData={animation} loop={true} />
      </div>
    </div>
  );
};
