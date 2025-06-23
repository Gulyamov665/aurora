import React, { useEffect } from "react";
import { Box, Typography, Card, CardContent, FormControl, Select, Link } from "@mui/material";
import { MenuItem, Fade, CircularProgress, Button } from "@mui/material";
import { EditorType, OrdersType, UserInfoType } from "@store/user/types";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import WifiTetheringIcon from "@mui/icons-material/WifiTethering";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import { LazyGetCouriersQueryType } from "@store/admin/api/staffApi";
import TableChartIcon from "@mui/icons-material/TableChart";
import { useForm, Controller } from "react-hook-form";
import { ORDER_STATUS_LABELS } from "./Statuses";
import { UpdateOrderMutationType } from "@store/admin/api/orders";


interface OrderDetailsProps {
  order?: OrdersType;
  orderFetch: boolean;
  couriersResult: LazyGetCouriersQueryType[1];
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  updateOrder: UpdateOrderMutationType[0]
  
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({ order, orderFetch, couriersResult, setOpenModal, updateOrder }) => {

  
  const { control, handleSubmit, reset, formState: { isDirty }, } = useForm({
    defaultValues: {
      courier_id: order?.courier?.id || 0,
      status: order?.status || "",
    },
  });

  const onSubmit = async (data: { courier_id: number; status: string }) => {
    if (!order?.id) return;

    const courier: UserInfoType | undefined = couriersResult?.data?.couriers?.find(
      (courier: UserInfoType) => courier.id === data.courier_id
    );

    console.log(courier)
    try {

      await updateOrder({
      id: order?.id,
      body: {
        status: data.status,
        courier: {
          id: data.courier_id,
          username: `${courier?.first_name}  ${courier?.last_name}`,
          phone_number: courier?.phone,

        },
      },
    }).unwrap()
      // alert("Обновлен");
    } catch (error) {
      console.error("Ошибка обновления:", error);
      // alert("Обновлен");
    }
  };

  useEffect(() => {
    if (order) {
      reset({
        courier_id: order?.courier?.id || 0,
        status: order?.status || "",
      });
    }
  }, [order, reset]);

  if (orderFetch)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "468px" }}>
        <Fade in={orderFetch} unmountOnExit timeout={300}>
          <CircularProgress />
        </Fade>
      </Box>
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
              <Typography variant="subtitle1">{order?.user_phone_number}</Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <LocationOnIcon color="error" />
            <Box>
              <Typography variant="body2" color="textSecondary">
                Адрес доставки
              </Typography>
              <Typography variant="subtitle1">{order?.location.address}</Typography>
              <Typography variant="subtitle1">
                <Button
                  variant="outlined"
                  size="small"
                  color="info"
                  style={{ textDecoration: "none" }}
                  href={`https://yandex.ru/maps/?pt=${order?.long},${order?.lat}&z=16&l=map`}
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
              <Link underline="hover" sx={{ cursor: "pointer" }} onClick={() => setOpenModal(true)}>
                Содержимое заказа
              </Link>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <CalendarMonthIcon color="inherit" />
            <Box>
              <Typography variant="body2" color="textSecondary">
                Дата заказа
              </Typography>
              <Typography variant="subtitle1">{order?.created_at}</Typography>
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
            <DeliveryDiningIcon color="warning" />
            <Box width="100%">
              <Typography variant="body2" color="textSecondary">
                Курьер
              </Typography>
              <Controller
                name="courier_id"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth size="small">
                    <Select {...field}>
                      {couriersResult?.data?.couriers?.map((courier: EditorType) => (
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
                control={control}
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
            <Button type="submit" variant="contained" color="success" disabled={!isDirty}>Сохранить</Button>
          </Box>
        </CardContent>
      </Card>
    </form>
  );
};
