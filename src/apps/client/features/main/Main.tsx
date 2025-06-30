import React from "react";
import { Box, Typography, Grid } from "@mui/material";

import { RestaurantCard } from "./components/RestaurantCard";
import { useGetRestaurantsQuery } from "@store/user/api/restaurantsApi";
import { Link } from "react-router-dom";
import Header from "../header/Header";

export const Main: React.FC = () => {
  const { data } = useGetRestaurantsQuery();

  return (
    <Box>
      <Header />
      <div className="container py-4">
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Рестораны
        </Typography>
        <Grid container spacing={3}>
          {data?.map((restaurant) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={restaurant.id}>
              <Link to={`/vendor/${restaurant.name}`} style={{ textDecoration: "none" }}>
                <RestaurantCard image={restaurant.background_photo} name={restaurant.name} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
    </Box>
  );
};
