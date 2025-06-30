import React, { useEffect } from "react";
import { OrderDetail } from "../components/OrderDetail";
import { useNavigate, useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "@store/admin/api/orders";
import { Box } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useSocket } from "@/hooks/useSocket";
import { OrderAnimation } from "../components/OrderAnimation";
import { OrderCard } from "./MyOrders";
import { OrdersType } from "@store/user/types";
import { useSelector } from "react-redux";
import { authState } from "@store/user/slices/authSlice";
import Loading from "../../loading/Loading";

export const OrderDetailPage: React.FC = () => {
  const { id } = useParams();
  const { data: order, refetch } = useGetOrderByIdQuery(Number(id), { skip: !id });
  const { isUser } = useSelector(authState);
  const socket = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    if (socket) {
      const handleRefetchOrder = (order: OrdersType) => {
        if (order.user_id === isUser?.user_id) refetch();
      };

      socket.on("update_order", handleRefetchOrder);
    }
    return () => {
      socket?.off("update_order");
    };
  }, [socket, refetch]);

  if (!order) {
    return <Loading />;
  }

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", p: 2 }}>
      <OrderCard>
        <Box onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>
          <ArrowBack sx={{ mb: 3 }} />
        </Box>
        <OrderAnimation order={order} />
        <OrderDetail order={order} />
      </OrderCard>
    </Box>
  );
};
