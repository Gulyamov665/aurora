import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { GridComponentProps } from "../types";

export const GridComponent: React.FC<GridComponentProps> = ({ sum = 0 }) => {
  console.log(sum);
  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="subtitle2">Общая сумма</Typography>
            <Typography variant="h6">{sum?.toLocaleString()}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="subtitle2">Кол-во заказов</Typography>
            <Typography variant="h6">6</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="subtitle2">Доставленные</Typography>
            <Typography variant="h6" color="success.main">
              3
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="subtitle2">Отмененные</Typography>
            <Typography variant="h6" color="error.main">
              1
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
