import { ArrowForwardIos } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { FC } from "react";
import { CostBoxType } from "../types/orderTypes";

export const CostBox: FC<CostBoxType> = ({ handleCreateOrder, items }) => {
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
        onClick={handleCreateOrder}
        fullWidth
        variant="contained"
        endIcon={<ArrowForwardIos />}
        sx={{
          paddingY: 1.5,
          backgroundColor: "#f5f4f2",
          color: "black",
          textTransform: "none",
          fontWeight: 600,
          fontSize: "1rem",
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
