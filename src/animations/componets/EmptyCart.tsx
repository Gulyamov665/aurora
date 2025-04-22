import React from "react";
import animation from "../files/waitConfirmation.lottie";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const EmptyCart: React.FC = () => {
  return (
    <div>
      <div style={{ width: 400, height: 400, margin: "0 auto" }}>
        <DotLottieReact src={animation} loop autoplay />
      </div>
    </div>
  );
};
