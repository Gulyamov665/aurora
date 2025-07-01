import React from "react";
import { Card, CardContent, CardMedia, Typography, IconButton, Stack } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import { VendorCardProps } from "./types";
import { vendorCardContentsSx, vendorCardContentSx, vendorCardSx } from "./assets/styles";

export const VendorCard: React.FC<VendorCardProps> = ({ data }) => {
  return (
    <div className="container container-sm">
      <Card sx={vendorCardSx}>
        <CardMedia component="img" height="320" image={data?.background_photo} alt="restaurant" />

        <CardContent sx={vendorCardContentsSx}>
          <Stack direction="row">
            <IconButton color="inherit">
              <FavoriteBorderIcon />
            </IconButton>
            {data?.telegram_link && (
              <IconButton color="inherit" href={data.telegram_link}>
                <TelegramIcon />
              </IconButton>
            )}
            {data?.instagram_link && (
              <IconButton color="inherit" href={data?.instagram_link}>
                <InstagramIcon />
              </IconButton>
            )}
          </Stack>
        </CardContent>
        <CardContent sx={vendorCardContentSx}>
          <Typography variant="h5" component="div" fontWeight="bold">
            {data?.name}
          </Typography>
          <Typography variant="subtitle2" fontWeight="bold" sx={{ maxWidth: "200px", overflow: "hidden" }}>
            {data?.address}
          </Typography>
          <Typography variant="subtitle2" component="div" fontWeight="bold">
            открыто
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};
