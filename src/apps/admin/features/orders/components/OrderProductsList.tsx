import { Grid, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { IOrderProductsListProps } from "../types";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";

export const OrderProductsList: React.FC<IOrderProductsListProps> = (props) => {
  const { product, control, setShowOptions, showOptions, handleAddProduct } = props;

  return (
    <Grid container alignItems="center" justifyContent={"space-between"} spacing={1}>
      <Grid item xs={4}>
        <Typography>{product.name}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography color="text.secondary">{product.price} сум</Typography>
      </Grid>
      <Controller
        name={`add_${product.id}`}
        control={control}
        render={() =>
          product.options.variants.length > 0 ? (
            <Grid item xs={2}>
              <ExpandMoreIcon
                onClick={() => setShowOptions(!showOptions)}
                color="error"
                fontSize="medium"
                sx={{
                  cursor: "pointer",
                }}
              />
            </Grid>
          ) : (
            <Grid item xs={2}>
              <AddIcon
                onClick={() => handleAddProduct(product.id, "add")}
                color="secondary"
                fontSize="medium"
                sx={{
                  cursor: "pointer",
                }}
              />
            </Grid>
          )
        }
      />
    </Grid>
  );
};
