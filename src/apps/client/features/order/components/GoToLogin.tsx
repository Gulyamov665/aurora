import { Box } from "@mui/material";
import React from "react";
import { OrderCard } from "../pages/MyOrders";
import { GoToLoginProps } from "../types/orderTypes";
import { IsGuestFrame } from "@/apps/common/IsGuestFrame";

export const GoToLogin: React.FC<GoToLoginProps> = ({ goToLogin, goToRegister, text }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: "45%" }}>
      <OrderCard>
        <IsGuestFrame goToLogin={goToLogin} goToRegister={goToRegister} text={text} />
      </OrderCard>
    </Box>
  );
};
