import React from "react";
import { Card, CardContent, CardMedia, Typography, IconButton, Stack } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";

export type VendorCardProps = {
  data?: {
    waiter_chat_id: number;
    background_photo: string;
    name: string;
    address: string;
    instagram_link: string;
    telegram_link: string;
    logo: string;
    orders_chat_id: number;
    availability_orders: boolean;
  };
};

export const VendorCard: React.FC<VendorCardProps> = ({ data }) => {
  return (
    <div className="container container-sm">
      <Card
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(12px)",
          color: "#000",
          boxShadow: "0 2px 24px rgba(0,0,0,0.5)",
          mb: 4,
          padding: 0,
        }}
      >
        {/* Address chip */}
        {/* <Box sx={{ position: "absolute", top: 16, left: 16, zIndex: 2 }}>
          <Chip
            label="улица Абдурахмана Джами, 3/2"
            sx={{
              bgcolor: "#e0e0e0",
              color: "#000",
              fontWeight: 500,
              borderRadius: 2,
            }}
          />
        </Box> */}

        {/* Main image */}
        <CardMedia component="img" height="320" image={data?.background_photo} alt="restaurant" />

        <CardContent
          sx={{
            position: "absolute",
            zIndex: 3,
            bottom: 10,
            right: 20,
            color: "black",
            background: "rgba(255, 255, 255, 0.7)",
            borderRadius: 4,
            padding: 0,
          }}
        >
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
        <CardContent
          sx={{
            position: "absolute",
            zIndex: 3,
            bottom: 10,
            left: 10,
            // color: "white",
            color: "black",
            // background: "rgba(0, 0, 0, 0.7)",
            background: "rgba(255, 255, 255, 0.7)",

            borderRadius: 4,
          }}
        >
          <Typography variant="h5" component="div" fontWeight="bold">
            {data?.name}
          </Typography>
          <Typography variant="subtitle2" fontWeight="bold" sx={{ maxWidth: "200px", overflow: "hidden" }}>
            {data?.address}
          </Typography>

          {/* Actions */}
        </CardContent>
      </Card>
    </div>
  );
};
