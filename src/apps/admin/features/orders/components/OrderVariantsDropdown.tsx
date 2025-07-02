import AddIcon from "@mui/icons-material/Add";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { IOrderVariantsDropdown } from "../types";

export const OrderVariantsDropdown: React.FC<IOrderVariantsDropdown> = ({ handleChangeQuantity, id, variants }) => {
  return (
    <Box>
      {variants?.map((option) => (
        <Grid container alignItems="center" justifyContent={"space-between"} key={option.id} spacing={1} mt={1}>
          <Grid item xs={4}>
            <Typography>{option.name}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography color="text.secondary">{option.price} сум</Typography>
          </Grid>
          <Grid item xs={2}>
            <AddIcon
              onClick={() => handleChangeQuantity(id, "add", option.id)}
              color="secondary"
              fontSize="medium"
              sx={{
                cursor: "pointer",
              }}
            />
          </Grid>
        </Grid>
      ))}
      <hr />
    </Box>
  );
};
