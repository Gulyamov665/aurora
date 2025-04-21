import { ArrowForwardIos } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { FC } from "react";
import { CostBoxType } from "../types/orderTypes";

export const CostBox: FC<CostBoxType> = ({ items, toConfirmPage }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: 2,
        p: 2,
        mt: 2,
      }}
    >
      <Typography variant="subtitle1" fontWeight="bold" mb={2}>
        Итого: {items && items?.totalPrice} сум
      </Typography>

      <Button
        onClick={toConfirmPage}
        fullWidth
        variant="contained"
        endIcon={<ArrowForwardIos />}
        sx={{
          p: 1,
          borderRadius: "16px",
          backgroundColor: "#f5f4f2",
          mb: 2,
          textAlign: "center",
          cursor: "pointer",
          color: "#000",
          fontWeight: 500,
          ":hover": {
            backgroundColor: "#e8e7e5",
          },
        }}
      >
        Далее
      </Button>
    </Box>
  );
};
