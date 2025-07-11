import { Box, Typography, TextField, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FC } from "react";
import { ConfirmOrderProps } from "../types/orderTypes";
import { LocationForm } from "../../map/components/LocationForm";
import { OrderButton } from "@/animations/componets/OrderButton";

export const ConfirmOrder: FC<ConfirmOrderProps> = ({ navigate, state, handleCreateOrder, items, register }) => {
  const fee = 3500;
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
      </Box>
      <Box>
        <Typography fontWeight={500} sx={{ mb: 1 }}>
          Работа сервиса : {fee.toLocaleString()} сум
        </Typography>
        <Typography fontWeight={500} sx={{ mb: 1 }}>
          Доставка : {items?.delivery_price ? `${items.delivery_price.toLocaleString()} сум` : "Бесплатно"}
        </Typography>
        <Divider />
        <Typography variant="h6" sx={{ mb: 1, mt: 1 }}>
          Итого: {(items?.totalPrice + fee + items.delivery_price).toLocaleString()} сум
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <OrderButton onClick={handleCreateOrder} navigate={navigate} />
        </Box>
      </Box>
    </Box>
  );
};
