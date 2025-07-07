import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Card, Grid, Typography } from "@mui/material";
import { CartItem } from "@store/user/types";
import { Controller } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import { IOrderContentProps } from "../types";

export const OrderContentList: React.FC<IOrderContentProps> = ({ handleChangeQuantity, orderProducts, control }) => {
  return (
    <Box mt={2} display="flex" flexDirection="column" gap={1}>
      {orderProducts.map((orderItem: CartItem) => (
        <Card
          key={orderItem.options ? orderItem.options.id : orderItem.id}
          variant="outlined"
          sx={{
            p: 2,
          }}
        >
          <Grid container alignItems="center" justifyContent={"space-around"} spacing={2}>
            <Grid item xs={5}>
              <Typography variant="subtitle1" fontWeight="bold">
                {orderItem.name}
              </Typography>
              {orderItem.options && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mt: 0.5,
                  }}
                >
                  Вариант: {orderItem.options.name}
                </Typography>
              )}
            </Grid>

            <Grid item xs={4}>
              <Typography color="text.primary" fontWeight="medium">
                {orderItem.options ? orderItem.options.price.toLocaleString() : orderItem.price.toLocaleString()} сум
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <Controller
                  name={`add_${orderItem.id}`}
                  control={control}
                  render={() => (
                    <AddIcon
                      color="success"
                      sx={{
                        cursor: "pointer",
                      }}
                      fontSize="small"
                      onClick={() => handleChangeQuantity(orderItem.id, "increase", orderItem?.options?.id)}
                    />
                  )}
                />
                <Typography>{orderItem.quantity}</Typography>

                <Controller
                  name={`remove_${orderItem.id}`}
                  control={control}
                  render={() => (
                    <RemoveIcon
                      sx={{
                        cursor: "pointer",
                      }}
                      color="error"
                      fontSize="small"
                      onClick={() => handleChangeQuantity(orderItem.id, "decrease", orderItem?.options?.id)}
                    />
                  )}
                />
              </Box>
            </Grid>
          </Grid>
        </Card>
      ))}
    </Box>
  );
};
