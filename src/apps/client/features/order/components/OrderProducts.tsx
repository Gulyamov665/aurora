import { FC } from "react";
import { OrderProductsProps } from "../types/orderTypes";
import { Container, Typography, Card, CardMedia, CardContent, CardActions, IconButton, Grow } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { CardMediaStyle, CardStyle, TypographyStyle } from "../assets/Styles";
import noDishPhoto from "@/assets/default.jpg";

const OrderProducts: FC<OrderProductsProps> = ({ product, increase, decrease }) => {
  return (
    <Container maxWidth="md" sx={{ mt: 0 }}>
      <Grow in key={product.id} timeout={500}>
        <Card sx={CardStyle}>
          <CardMedia component="img" image={product.photo || noDishPhoto} alt={product.name} sx={CardMediaStyle} />
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight="bold" sx={TypographyStyle}>
              {product.options?.price || product.price} сум
            </Typography>
            {product.options?.name && (
              <Typography variant="body1" color="text.secondary" sx={TypographyStyle}>
                {product.options.name}
              </Typography>
            )}

            <Typography variant="body1" color="text.secondary" sx={TypographyStyle}>
              {product.name}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton color="primary" onClick={decrease}>
              <Remove />
            </IconButton>
            <Typography variant="h6">{product.quantity}</Typography>
            <IconButton color="primary" onClick={(e) => increase(e, { ...product }, 1)}>
              <Add />
            </IconButton>
          </CardActions>
        </Card>
      </Grow>
    </Container>
  );
};

export default OrderProducts;
