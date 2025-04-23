import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { OrderCard } from "../pages/MyOrders";
import { GoToLoginProps } from "../types/orderTypes";

export const GoToLogin: React.FC<GoToLoginProps> = ({ goToLogin, goToRegister, text }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: "45%" }}>
      <OrderCard>
        <Typography sx={{ textAlign: "center" }}>
          {text || "Чтобы продолжить, пожалуйста, войдите в свою учетную запись или зарегистрируйтесь."}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            variant="text"
            sx={{
              color: "black",
              fontWeight: 500,
              padding: "8px 16px",
              fontSize: "18px",
              textTransform: "none",
              backgroundColor: "#f5f4f2",
              mr: 2,
              borderRadius: "8px",
            }}
            onClick={goToLogin}
          >
            Вход
          </Button>

          <Button
            variant="text"
            sx={{
              color: "black",
              fontWeight: 500,
              padding: "8px 16px",
              fontSize: "18px",
              textTransform: "none",
              backgroundColor: "#f5f4f2",
              borderRadius: "8px",
            }}
            onClick={goToRegister}
          >
            Регистрация
          </Button>
        </Box>
      </OrderCard>
    </Box>
  );
};
