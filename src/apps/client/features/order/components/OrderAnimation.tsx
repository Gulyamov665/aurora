import React from "react";
import { Wait } from "@/animations/componets/Wait";
import { Box } from "@mui/material";
import { Cooking } from "@/animations/componets/Cooking";
import { Delivery } from "@/animations/componets/Delivery";
import { OrderAnimationProps } from "../types/orderTypes";

export const OrderAnimation: React.FC<OrderAnimationProps> = ({ order }) => {
  const renderAnimation = () => {
    switch (order.status) {
      case "new":
        return <Wait size={150} />;
      case "prepare":
        return <Cooking size={150} />;
      case "delivering":
        return <Delivery size={150} />;
      default:
        return <Wait size={150} />;
    }
  };

  return (
    <Box display={"flex"} justifyContent={"center"}>
      {renderAnimation()}
    </Box>
  );
};
