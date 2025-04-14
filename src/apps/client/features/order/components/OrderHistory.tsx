import React from "react";
import { OrderCard } from "../pages/MyOrders";
import { OrderHistoryProps } from "../types/orderTypes";
import { Box, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import noPhoto from "@/assets/nophoto.jpg";

export const OrderHistory: React.FC<OrderHistoryProps> = ({ order }) => {
  return (
    <OrderCard sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Box>
        <Typography>Заказ № {order.id}</Typography>
        <Typography variant="h5" fontWeight={500}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar src={order.restaurant?.photo} sx={{ mr: 1, width: 40, height: 40 }} sizes="s" />
            <Typography>{order.restaurant?.name}</Typography>
          </Box>
        </Typography>
      </Box>
      <AvatarGroup max={4}>
        {order.products.map((product) => (
          <Avatar sx={{ width: 30, height: 30 }} alt={product.name} src={product.photo || noPhoto} key={product.id} />
        ))}
      </AvatarGroup>

      <Typography variant="body1" fontWeight={800}>
        {Number(order.total_price).toLocaleString()} сум{" "}
      </Typography>
    </OrderCard>
  );
};
