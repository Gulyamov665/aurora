import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { getStatusChip } from "@/apps/admin/features/orders/components/Statuses";
import { Box, Divider, List, ListItem, Typography } from "@mui/material";
import { OrderCard } from "../pages/MyOrders";
import { OrderDetailProps } from "../types/orderTypes";

export const OrderDetail: React.FC<OrderDetailProps> = ({ order }) => {
  return (
    <div>
      <OrderCard key={order.id}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6">Заказ #{order?.id}</Typography>
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
    </div>
  );
};
