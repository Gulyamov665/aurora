import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { RestaurantCard } from "./components/RestaurantCard";
import { useGetRestaurantsQuery } from "@store/user/api/restaurantsApi";
import { Link } from "react-router-dom";
import Header from "../header/Header";

export const Main: React.FC = () => {
  const { data } = useGetRestaurantsQuery();
  console.log(data);
  return (
    <Box>
      <Header />
      <Container sx={{ py: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Рестораны
        </Typography>
        <Stack spacing={3}>
          {data
            ?.filter((restaurant) => restaurant.is_active)
            .map((restaurant) => (
              <Link to={`/vendor/${restaurant.name}`} style={{ textDecoration: "none" }} key={restaurant.id}>
                <RestaurantCard image={restaurant.background_photo} name={restaurant.name} />
              </Link>
            ))}
        </Stack>
      </Container>
    </Box>
  );
};
