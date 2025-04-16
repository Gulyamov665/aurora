import React, { MouseEvent } from "react";
import { CardActions, IconButton, Typography } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { ProductData } from "../client/features/products/types";

type CounterBoxProps = {
  decrease: (event: MouseEvent<HTMLButtonElement>) => void;
  increase: (event: MouseEvent<HTMLButtonElement>, productData: ProductData) => Promise<void>;
  quantity?: number;
};

console.log("first");
export const CounterBox: React.FC<CounterBoxProps> = ({ increase, decrease, quantity }) => {
  return (
    <CardActions sx={{ justifyContent: "center", height: 24 }}>
      <IconButton color="primary" onClick={decrease}>
        <Remove />
      </IconButton>
      <Typography variant="h6">{quantity}</Typography>
      <IconButton color="primary" onClick={(e) => increase(e, {} as ProductData)}>
        <Add />
      </IconButton>
    </CardActions>
  );
};
