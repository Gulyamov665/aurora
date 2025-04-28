import { Box, Typography, TextField } from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FC } from "react";
import { ConfirmOrderProps } from "../types/orderTypes";
import { LocationForm } from "../../map/components/LocationForm";
import { OrderButton } from "@/animations/componets/OrderButton";

export const ConfirmOrder: FC<ConfirmOrderProps> = ({ navigate, state, handleCreateOrder, items, register }) => {
  return (
    <Box
      sx={{
        p: 2,
        maxWidth: 800,
        mx: "auto",
        backgroundColor: "#fff",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: 2,
      }}
    >
      <ArrowBackIcon
        onClick={() => navigate(state.from)}
        sx={{ fontSize: "30px", cursor: "pointer", marginBottom: "20px" }}
      />
      <Typography variant="h5">Куда</Typography>

      <LocationForm register={register} navbox={false} p={0} disabled={true} />
      <TextField
        sx={{ mt: 2 }}
        disabled
        type="text"
        label="Номер телефона"
        defaultValue=""
        {...register("phone")}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 1, mt: 2 }}>
          Оплата
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Пожалуйста, внимательно проверьте детали заказа — изменить их после подтверждения будет невозможно. При отмене
          доступ к оформлению заказов может быть временно ограничен.
        </Typography>

        {/* 
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <Button variant="outlined" sx={{ flex: 1 }}>
            ••0106
          </Button>
          <Button variant="contained" sx={{ flex: 1 }}>
            Наличные
          </Button>
          <Button variant="outlined" sx={{ flex: 1 }}>
            Добавить карту
          </Button>
        </Box> */}
      </Box>
      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Итого: {items?.totalPrice?.toLocaleString()} сум
        </Typography>
        {/* <Button
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          sx={{
            bgcolor: "#00A86B",
            "&:hover": { bgcolor: "#008f5a" },
          }}
          onClick={handleCreateOrder}
        >
          Оплатить
        </Button> */}
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <OrderButton onClick={handleCreateOrder} navigate={navigate} />
        </Box>
      </Box>
    </Box>
  );
};
