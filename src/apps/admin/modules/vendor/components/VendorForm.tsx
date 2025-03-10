import { FC } from "react";
import { VendorFormType } from "../types";
import { Card, CardContent, Typography, TextField, Button, Box, InputAdornment, CircularProgress } from "@mui/material";
import {
  Instagram,
  Telegram,
  QrCode,
  LocationOnOutlined,
  ShoppingCartCheckoutOutlined,
  SupportAgentOutlined,
  LockOpenOutlined,
} from "@mui/icons-material";

const VendorForm: FC<VendorFormType> = ({ register, handleSubmit, handleUpdate, isLoading }) => {
  return (
    <form onSubmit={handleSubmit(handleUpdate)}>
      <Box sx={{ maxWidth: 1200, mx: "auto", mt: 5 }}>
        <Card elevation={6} sx={{ p: 3 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Настройки ресторана
          </Typography>

          {/* Основная информация */}
          <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", md: "row" } }}>
            <Card sx={{ mb: 3, p: 2 }} elevation={3}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Основная информация
                </Typography>
                <TextField
                  label="Название"
                  fullWidth
                  defaultValue="Olivia"
                  {...register("name")}
                  disabled
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Адрес"
                  defaultValue="USA California"
                  fullWidth
                  {...register("address")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnOutlined color="success" />
                      </InputAdornment>
                    ),
                  }}
                />
              </CardContent>
            </Card>

            {/* Контакты */}
            <Card sx={{ mb: 3, p: 2 }} elevation={3}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Контакты
                </Typography>
                <TextField
                  label="Ссылка Телеграм"
                  fullWidth
                  {...register("telegram_link")}
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: <Telegram color="primary" sx={{ mr: 1 }} />,
                  }}
                />
                <TextField
                  label="Ссылка Instagram"
                  fullWidth
                  {...register("instagram_link")}
                  InputProps={{
                    startAdornment: <Instagram color="error" sx={{ mr: 1 }} />,
                  }}
                />
              </CardContent>
            </Card>

            {/* Чаты */}
            <Card sx={{ mb: 3, p: 2 }} elevation={3}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Чаты
                </Typography>
                <TextField
                  label="Чат ID заказов"
                  fullWidth
                  {...register("orders_chat_id")}
                  disabled
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ShoppingCartCheckoutOutlined color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Чат ID вызова официанта"
                  fullWidth
                  {...register("waiter_chat_id")}
                  disabled
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SupportAgentOutlined color="error" />
                      </InputAdornment>
                    ),
                  }}
                />
              </CardContent>
            </Card>

            {/* Доступ */}
            <Card sx={{ mb: 3, p: 2 }} elevation={3}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Доступ
                </Typography>
                <TextField
                  label="Доступ к заказам"
                  fullWidth
                  {...register("availability_orders")}
                  disabled
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOpenOutlined color="info" />
                      </InputAdornment>
                    ),
                  }}
                />
              </CardContent>
            </Card>
          </Box>

          {/* Кнопки */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button variant="contained" color="error" startIcon={<QrCode />}>
              QrCode
            </Button>
            <Button variant="contained" color="primary">
              Предпросмотр
            </Button>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{
                mt: 3,
                background: "#210638",
                maxWidth: 400,
                height: 50,
                color: "white",
                "&:hover": {
                  background: "#3e0a6b",
                },
              }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Сохранить"}
            </Button>
          </Box>
        </Card>
      </Box>
    </form>
  );
};

export default VendorForm;
