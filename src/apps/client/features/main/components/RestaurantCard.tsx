import React from "react";
import { Card, CardMedia, CardContent, Typography, Box, IconButton } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import StarIcon from "@mui/icons-material/Star";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

interface RestaurantCardProps {
  image: string;
  name: string;
  time?: string;
  rating?: number;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ image, name, time, rating = 4 }) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        position: "relative",
        boxShadow: 3,
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia component="img" height="160" image={image} alt={name} sx={{ objectFit: "cover" }} />
        <IconButton
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
          }}
        >
          <BookmarkBorderIcon />
        </IconButton>
      </Box>
      <CardContent sx={{ p: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {name}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
          <Box display="flex" alignItems="center" gap={0.5}>
            <DirectionsCarIcon sx={{ fontSize: 18 }} />
            <Typography variant="body2" color="text.secondary">
              {time}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={0.5}>
            <StarIcon sx={{ fontSize: 18, color: "#000" }} />
            <Typography variant="body2" fontWeight="medium">
              {rating}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
