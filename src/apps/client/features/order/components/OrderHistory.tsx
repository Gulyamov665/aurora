import React from "react";
import { OrderCard } from "../pages/MyOrders";
import { OrderHistoryProps } from "../types/orderTypes";
import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

export const OrderHistory: React.FC<OrderHistoryProps> = ({ order }) => {
  return (
    <div>
      <OrderCard sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>{order.restaurant?.name}</h2>
        <AvatarGroup max={4}>
          {order.products.map((product) => (
            <Avatar alt={product.name} src={product.photo} key={product.id} />
          ))}
        </AvatarGroup>

        <Typography variant="body1" fontWeight={500}>
          {Number(order.total_price).toLocaleString()} сум{" "}
        </Typography>
      </OrderCard>
    </div>
  );
};
