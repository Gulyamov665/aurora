import { Box, Typography, Button } from "@mui/material";
import { FC } from "react";

import { Link } from "react-router-dom";
import { GuestBoxProps } from "../types";

export const GuestBox: FC<GuestBoxProps> = ({ setToRegPage }) => {
  return (
    <Box>
      <Typography
        variant="subtitle1"
        sx={{
          mb: 3,
          mt: 2,
          fontWeight: 500,
          textAlign: "center",
          fontSize: {
            xs: "14px", // экраны до 600px
            sm: "14px", // от 600px
            md: "16px", // от 900px
          },
        }}
      >
        Для оформления заказа необходимо зарегистрироваться
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Button
            variant="text"
            sx={{
              color: "#1976d2",
              fontWeight: 500,
              padding: "8px 16px",
              fontSize: "18px",
              textTransform: "none",
              backgroundColor: "#f5f4f2",
              mr: 2,
            }}
          >
            Войти
          </Button>
        </Link>

        <Button
          onClick={() => setToRegPage(false)}
          variant="text"
          sx={{
            color: "#1976d2",
            fontWeight: 500,
            padding: "8px 16px",
            fontSize: "18px",
            textTransform: "none",
            backgroundColor: "#f5f4f2",
          }}
        >
          Отмена
        </Button>
      </Box>
    </Box>
  );
};
