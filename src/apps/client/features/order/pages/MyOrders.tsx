import { FC } from "react";
import { Box, Card, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useGetMyOrdersQuery } from "@store/admin/api/orders";
import { useSelector } from "react-redux";
import { authState } from "@store/user/slices/authSlice";
import { OrderHistory } from "../components/OrderHistory";
import { Link } from "react-router-dom";
import Loading from "../../loading/Loading";

export const OrderCard = styled(Card)({
  marginBottom: 16,
  padding: 16,
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
});

export const MyOrders: FC = () => {
  const { isUser } = useSelector(authState);
  const skip = { skip: !isUser?.user_id };
  const { data, isLoading } = useGetMyOrdersQuery({ userId: isUser?.user_id }, skip);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 500 }}>
        Мои заказы
      </Typography>

      {data?.map((order) => (
        <Link to={`${order.id}`} key={order.id} style={{ all: "unset", cursor: "pointer" }}>
          <OrderHistory order={order} key={order.id} />
        </Link>
      ))}
    </Box>
  );
};
