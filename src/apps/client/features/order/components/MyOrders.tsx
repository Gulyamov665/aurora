import { FC } from "react";
import { Box, Card, Typography, Divider, List, ListItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useGetMyOrdersQuery } from "@store/admin/api/orders";
import { useSelector } from "react-redux";
import { authState } from "@store/user/slices/authSlice";
import { getStatusChip } from "@/apps/admin/features/orders/components/Statuses";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const OrderCard = styled(Card)({
  marginBottom: 16,
  padding: 16,
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
});

export const MyOrders: FC = () => {
  const { isUser } = useSelector(authState);
  const skip = { skip: !isUser?.user_id };
  const { data } = useGetMyOrdersQuery({ userId: isUser?.user_id }, skip);

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 500 }}>
        Мои заказы
      </Typography>

      {data?.map((order) => (
        <OrderCard key={order.id}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6">Заказ #{order.id}</Typography>
            {getStatusChip(order.status)}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <AccessTimeIcon sx={{ mr: 1, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              {new Date(order.created_at).toLocaleString()}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <LocationOnIcon sx={{ mr: 1, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              {/* {order.address} */}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <List>
            {order.products.map((product) => (
              <ListItem
                key={product.id}
                sx={{
                  py: 1,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body1">
                  {product.name} x{product.quantity}
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {product.price.toLocaleString()} сум
                </Typography>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6">Итого:</Typography>
            <Typography variant="h6" color="primary">
              {order.total_price.toLocaleString()} сум
            </Typography>
          </Box>
        </OrderCard>
      ))}
    </Box>
  );
};
