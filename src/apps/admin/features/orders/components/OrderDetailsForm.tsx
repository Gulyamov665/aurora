import React from "react";
import { Box, Typography, Card, CardContent, FormControl, Select, Link } from "@mui/material";
import { ORDER_STATUS_LABELS } from "./Statuses";
import { MenuItem, Button } from "@mui/material";
import { EditorType } from "@store/user/types";
import { Controller } from "react-hook-form";
import { OrderDetailsFormProps } from "../types";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import WifiTetheringIcon from "@mui/icons-material/WifiTethering";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import TableChartIcon from "@mui/icons-material/TableChart";
import CommentIcon from "@mui/icons-material/Comment";

export const DetailsForm: React.FC<OrderDetailsFormProps> = (props) => {
  return (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
      <Card
        sx={{
          background: "transparent",
          boxShadow: 0,
        }}
      >
        <CardContent>
          <Box mb={10}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Заказ №{props.order?.id}
            </Typography>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <PersonIcon color="primary" />
              <Box>
                <Typography variant="body2" color="textSecondary">
                  Клиент
                </Typography>
                <Typography variant="subtitle1">{props.order?.created_by}</Typography>
                <Typography variant="subtitle1">{props.order?.user_phone_number}</Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <LocationOnIcon color="error" />
              <Box>
                <Typography variant="body2" color="textSecondary">
                  Адрес доставки
                </Typography>
                <Typography variant="subtitle1">{props.order?.location.address}</Typography>
                <Typography variant="subtitle1">
                  <Button
                    variant="outlined"
                    size="small"
                    color="info"
                    style={{
                      textDecoration: "none",
                    }}
                    href={`https://yandex.ru/maps/?pt=${props.order?.long},${props.order?.lat}&z=16&l=map`}
                    target="_blank"
                  >
                    Открыть на карте
                  </Button>
                </Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <TableChartIcon color="error" />
              <Box>
                <Link
                  underline="hover"
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={() => props.setOpenModal(true)}
                >
                  Состав заказа
                </Link>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <CalendarMonthIcon color="inherit" />
              <Box>
                <Typography variant="body2" color="textSecondary">
                  Дата заказа
                </Typography>
                <Typography variant="subtitle1">{props.order?.created_at}</Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <LocalAtmIcon color="warning" />
              <Box>
                <Typography variant="body2" color="textSecondary">
                  Сумма
                </Typography>
                <Typography variant="subtitle1">{Number(props.order?.total_price).toLocaleString()} UZS</Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <CommentIcon color="primary" />
              <Box>
                <Typography variant="body2" color="textSecondary">
                  Комментарий к заказу:
                </Typography>
                <Typography variant="subtitle1">{props.order?.comment}</Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <DeliveryDiningIcon color="warning" />
              <Box width="100%">
                <Typography variant="body2" color="textSecondary">
                  Курьер
                </Typography>
                <Controller
                  name="courier_id"
                  control={props.control}
                  render={({ field }) => (
                    <FormControl fullWidth size="small">
                      <Select {...field}>
                        <MenuItem value={0}>Не выбран</MenuItem>
                        {props.couriersResult?.data?.couriers?.map((courier: EditorType) => (
                          <MenuItem key={courier.id} value={courier.id}>
                            {courier.first_name} {courier.last_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Box>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <WifiTetheringIcon color="secondary" />
              <Box width="100%">
                <Typography variant="body2" color="textSecondary">
                  Статус
                </Typography>
                <Controller
                  name="status"
                  control={props.control}
                  render={({ field }) => (
                    <FormControl fullWidth size="small">
                      <Select {...field}>
                        {Object.entries(ORDER_STATUS_LABELS).map(([key, label]) => (
                          <MenuItem key={key} value={key}>
                            {label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Box>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mt={4}>
              <Button type="submit" variant="contained" color="success" disabled={!props.isDirty}>
                Сохранить
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </form>
  );
};
