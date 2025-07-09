import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { getStatusChip } from "@/apps/admin/features/orders/components/Statuses";
import { Box, Divider, List, ListItem, Typography } from "@mui/material";
import { OrderDetailProps } from "../types/orderTypes";
import PhoneIcon from "@mui/icons-material/Phone";

export const OrderDetail: React.FC<OrderDetailProps> = ({ order }) => {
  return (
    <div>
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
        <LocationOnIcon sx={{ mr: 1 }} color="warning" />
        <Typography variant="body2" color="text.secondary">
          {order.location?.address}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <PhoneIcon color="success" sx={{ cursor: "pointer", mr: 1 }} />
        <a
          href={`tel:${order.restaurant.phone}`}
          style={{ textDecoration: "none" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Typography variant="body2" color="text.secondary">
            {"Номер заведения"} : {order.restaurant.phone}
          </Typography>
        </a>
      </Box>

      {order.courier?.phone_number && (
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <PhoneIcon color="error" sx={{ cursor: "pointer", mr: 1 }} />
          <a
            href={`tel:${order.user_phone_number}`}
            style={{ textDecoration: "none" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Typography variant="body2" color="text.secondary">
              {"Номер курьера"} : {order.courier.phone_number}
            </Typography>
          </a>
        </Box>
      )}

      <Divider sx={{ my: 2 }} />

      <List>
        {order.products.map((product) => (
          <ListItem
            key={product.options ? product.options.id : product.id}
            sx={{
              py: 1,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body1">
              {product.name} {product.options && product.options.name} x {product.quantity}
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              {product.options
                ? (product.options.price * product.quantity).toLocaleString()
                : (product.price * product.quantity).toLocaleString()}{" "}
              сум
            </Typography>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="body1">Работа сервиса:</Typography>
        <Typography variant="body1" color="text.secondary">
          {order.fee.toLocaleString()} сум
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="body1">Доставка:</Typography>
        <Typography variant="body1" color="text.secondary">
          {order?.delivery_price ? `${order.delivery_price.toLocaleString()} сум` : "Бесплатно"}
        </Typography>
      </Box>
      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6">Итого:</Typography>
        <Typography variant="h6" color="primary">
          {parseInt(order.total_price).toLocaleString()} сум
        </Typography>
      </Box>
    </div>
  );
};
