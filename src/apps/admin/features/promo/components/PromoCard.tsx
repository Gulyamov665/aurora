import { Delete, Edit, Visibility } from "@mui/icons-material";
import { Card, CardContent, CardMedia, IconButton, styled, Switch, Typography } from "@mui/material";
import { FC } from "react";
import { PromoCardProps } from "../types";

const StyledCard = styled(Card)({
  borderRadius: "16px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease-in-out",
  width: 250,
  margin: "0 auto",
  ":hover": {
    transform: "scale(1.05)",
  },
});

export const PromoCard: FC<PromoCardProps> = ({
  id,
  name,
  photo,
  is_active,
  price,
  description,
  restaurant,
  updatePromo,
  deletePromoUnit,
}) => {
  const promo = { id, name, photo, is_active, price, description, restaurant };

  return (
    <StyledCard>
      <CardMedia component="img" height="140" image={photo} alt={name} />
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {name}
        </Typography>
        <Typography variant="h4" fontWeight="bold">
          {price}
        </Typography>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
          <Switch checked={is_active} onChange={() => updatePromo(promo)} color="primary" />
          <div>
            <IconButton color="primary">
              <Edit />
            </IconButton>
            <IconButton color="secondary" onClick={() => deletePromoUnit({ id: id, message: name, type: "promo" })}>
              <Delete />
            </IconButton>
            <IconButton color="default">
              <Visibility />
            </IconButton>
          </div>
        </div>
      </CardContent>
    </StyledCard>
  );
};
