import React from "react";
import { OrderCard } from "../pages/MyOrders";
import { OrderHistoryProps } from "../types/orderTypes";
import { Box, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import noPhoto from "@/assets/nophoto.jpg";
import { getStatusChipNoIcons } from "@/apps/admin/features/orders/components/Statuses";

export const OrderHistory: React.FC<OrderHistoryProps> = ({ order }) => {
  return (
    <OrderCard sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Box>
        <Typography>Заказ № {order.id}</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box fontWeight={800}>
            <Avatar src={order.restaurant?.photo} sx={{ mr: 1, width: 40, height: 40 }} sizes="s" />
          </Box>
          <Typography>{order.restaurant?.name}</Typography>
        </Box>
      </Box>
      <AvatarGroup max={4}>
        {order.products.map((product) => (
          <Avatar
            sx={{ width: 30, height: 30 }}
            alt={product.name}
            src={product.photo || noPhoto}
            key={product.options ? product.options.id : product.id}
          />
        ))}
      </AvatarGroup>

      <Box fontWeight={800}>
        <Box>{getStatusChipNoIcons(order.status)}</Box>
        {Number(order.total_price).toLocaleString()} сум{" "}
      </Box>
    </OrderCard>
  );
};
