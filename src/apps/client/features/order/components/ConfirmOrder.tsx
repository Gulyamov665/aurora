import { Box, TextField, Typography, Switch, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FC } from "react";
import { ConfirmOrderProps } from "../types/orderTypes";

export const ConfirmOrder: FC<ConfirmOrderProps> = ({ navigate, state, handleCreateOrder, items }) => {
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
      <Typography variant="h5" sx={{ mb: 3 }}>
        Куда
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <HomeIcon sx={{ mr: 1 }} />
          <TextField fullWidth value="улица Абдурахмана Джами, 1" variant="standard" helperText="Бухара" />
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, mb: 2 }}>
          <TextField label="Подъезд" value="10" variant="standard" />
          <TextField label="Домофон" variant="standard" />
          <TextField label="Кв./офис" value="77" variant="standard" />
          <TextField label="Этаж" value="3" variant="standard" />
        </Box>

        <TextField fullWidth multiline label="Комментарий курьеру" variant="standard" sx={{ mb: 2 }} />

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <LocalPhoneIcon sx={{ mr: 1 }} />
          <TextField fullWidth value="+998 93 473-32-23" variant="standard" label="Телефон получателя" />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography>Оставить у двери</Typography>
          <Switch />
        </Box>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <ConfirmationNumberIcon sx={{ mr: 1 }} />
          <TextField fullWidth label="Промокод" variant="standard" />
        </Box>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Оплата
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Оплачиваете заказ наличными? Проверьте детали заказа — далее изменить их не получится. В случае отмены доступ
          к оформлению заказов будет ограничен
        </Typography>

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
        </Box>
      </Box>
      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Итого: {items?.totalPrice?.toLocaleString()} сум
        </Typography>
        <Button
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
        </Button>
      </Box>
    </Box>
  );
};
