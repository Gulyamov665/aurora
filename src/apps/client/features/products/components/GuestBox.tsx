import { Box, Typography, Button } from "@mui/material";
import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GuestBoxProps } from "../types";

export const GuestBox: FC<GuestBoxProps> = ({ setToRegPage }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginClick = () => {
    navigate("/login", { state: { from: location.pathname } });
  };

  return (
    <Box>
      <Typography
        variant="subtitle1"
        sx={{
          mb: 3,
          mt: 2,
          fontWeight: 500,
          textAlign: "center",
        }}
      >
        Для оформления заказа необходимо зарегистрироваться
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
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
          onClick={handleLoginClick}
        >
          Войти
        </Button>

        <Button
          onClick={() => setToRegPage(false)}
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
        >
          Отмена
        </Button>
      </Box>
    </Box>
  );
};
