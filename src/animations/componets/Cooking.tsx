import React from "react";
import animation from "../files/new-coocking.json";
import Lottie from "react-lottie-player/dist/LottiePlayerLight";

interface Cooking {
  size: number;
}

export const Cooking: React.FC<Cooking> = ({ size }) => {
  return (
    <div>
      <div style={{ width: size, height: size, margin: "0 auto" }}>
        <Lottie animationData={animation} loop={true} play />
      </div>
    </div>
  );
};
