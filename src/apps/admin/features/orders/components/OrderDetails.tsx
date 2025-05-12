import React, { useState } from "react";
import { Box, Typography, Card, CardContent, FormControl, Select } from "@mui/material";
import { MenuItem, Fade, CircularProgress, Button } from "@mui/material";
import { OrdersType } from "@store/user/types";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import WifiTetheringIcon from "@mui/icons-material/WifiTethering";
import AltRouteIcon from "@mui/icons-material/AltRoute";

interface OrderDetailsProps {
  order?: OrdersType;
  orderFetch: boolean;
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({ order, orderFetch }) => {
  const [loadingRoute, setLoadingRoute] = useState(false);

  const handleBuildRoute = () => {
    if (!navigator.geolocation) {
      alert("Геолокация не поддерживается вашим браузером");
      return;
    }

    setLoadingRoute(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://yandex.ru/maps/?rtext=${latitude},${longitude}~${order?.lat},${order?.long}&rtt=auto`;
        window.open(url, "_blank");
        setLoadingRoute(false);
      },
      (error) => {
        console.error(error);
        alert("Не удалось определить ваше местоположение");
        setLoadingRoute(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  };

  if (orderFetch)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "468px" }}>
        <Fade in={orderFetch} unmountOnExit timeout={300}>
          <CircularProgress />
        </Fade>
      </Box>
    );

  return (
    <Card sx={{ background: "transparent", boxShadow: 0 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Заказ №{order?.id}
        </Typography>

        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <PersonIcon color="primary" />
          <Box>
            <Typography variant="body2" color="textSecondary">
              Клиент
            </Typography>
            <Typography variant="subtitle1">{order?.created_by}</Typography>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <LocationOnIcon color="error" />
          <Box>
            <Typography variant="body2" color="textSecondary">
              Адрес доставки
            </Typography>
            <Typography variant="subtitle1">
              <Button
                variant="outlined"
                size="small"
                color="info"
                style={{ textDecoration: "none" }}
                href={`https://yandex.ru/maps/?pt=${order?.long},${order?.lat}&z=16&l=map`}
              >
                Открыть на карте
              </Button>
              <Button
                variant="outlined"
                color="info"
                size="small"
                startIcon={<AltRouteIcon />}
                onClick={handleBuildRoute}
                disabled={loadingRoute}
                sx={{ marginLeft: "12px" }}
              >
                {loadingRoute ? <CircularProgress /> : "Построить маршрут"}
              </Button>
            </Typography>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <PermContactCalendarIcon color="info" />
          <Box>
            <Typography variant="body2" color="textSecondary">
              Контакты
            </Typography>
            <Typography variant="subtitle1">+998(12)123 12 12</Typography>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <LocalAtmIcon color="warning" />
          <Box>
            <Typography variant="body2" color="textSecondary">
              Сумма
            </Typography>
            <Typography variant="subtitle1">{order?.total_price.toLocaleString()} UZS</Typography>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <WifiTetheringIcon color="secondary" />
          <Box width="100%">
            <Typography variant="body2" color="textSecondary">
              Статус
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={status}
                // onChange={handleStatusChange}
              >
                <MenuItem value="Готовится">Готовится</MenuItem>
                <MenuItem value="Отменён">Отменён</MenuItem>
                <MenuItem value="Доставлен">Доставлен</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* <Box display="flex" alignItems="center" gap={1} mb={2}>
          <LocalShippingIcon color="action" />
          <Box width="100%">
            <Typography variant="body2" color="textSecondary">
              Курьер
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={courier}
                onChange={handleCourierChange}
              >
                {couriers?.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box> */}

        <Box display="flex" alignItems="center" gap={1}>
          <CalendarMonthIcon color="inherit" />
          <Box>
            <Typography variant="body2" color="textSecondary">
              Дата заказа
            </Typography>
            <Typography variant="subtitle1">{order?.created_at}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
