import * as React from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Card, Grid, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Control, Controller } from "react-hook-form";
import { CartItem, ProductType } from "@store/user/types";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { ChangeOrderMutationType } from "@store/admin/api/orders";

interface OrderProductEditProps {
  productsResult: ProductType[];
  orderProducts: CartItem[];
  control: Control<any>;
  handleChangeOrder: ChangeOrderMutationType[0];
  orderId: number | undefined;
}

export const OrderProductEdit: React.FC<OrderProductEditProps> = ({
  productsResult,
  orderProducts,
  control,
  handleChangeOrder,
  orderId,
}) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleAddToCart = async (productId: number) => {
    try {
      alert(productId);
      console.log(productId);
      // Можно показать тост или спиннер
    } catch (error) {
      console.error("Ошибка при добавлении товара:", error);
    }
  };

  const handleChangeQuantity = async (productId: number, type: string) => {
    if (type === "increase") {
      const body = {
        id: orderId ?? 0,
        product_id: productId,
      };
      await handleChangeOrder(body);
    } else {
    }
  };

  // Группировка по категориям вручную
  const groupedByCategory = React.useMemo(() => {
    const result: Record<string, ProductType[]> = {};
    for (const product of productsResult) {
      const categoryLabel = product.category_label || "Без категории";
      if (!result[categoryLabel]) {
        result[categoryLabel] = [];
      }
      result[categoryLabel].push(product);
    }
    return result;
  }, [productsResult]);

  return (
    <Box display={"flex"} width={"100%"} height={800} justifyContent={"space-around"}>
      <Box mt={3} width={"50%"} height={"100%"}>
        <Typography>
          <b>Состав заказа</b>
        </Typography>
        <hr />
        <Box mt={2} display="flex" flexDirection="column" gap={1}>
          {orderProducts.map((orderItem: CartItem) => (
            <Card key={orderItem.id} variant="outlined" sx={{ p: 2 }}>
              <Grid container alignItems="center" justifyContent={"space-around"} spacing={2}>
                <Grid item xs={5}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {orderItem.name}
                  </Typography>
                  {orderItem.options && (
                    <>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Вариант: {orderItem.options.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Цена: {orderItem.options.price}
                      </Typography>
                    </>
                  )}
                </Grid>

                <Grid item xs={4}>
                  <Typography color="text.primary" fontWeight="medium">
                    {orderItem.price.toLocaleString()} сум
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Box sx={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
                    <Controller
                      name={`add_${orderItem.id}`}
                      control={control}
                      render={() => (
                        <AddIcon
                          color="success"
                          sx={{ cursor: "pointer" }}
                          fontSize="small"
                          onClick={() => handleChangeQuantity(orderItem.id, "increase")}
                        />
                      )}
                    />
                    <Typography>{orderItem.quantity}</Typography>

                    <Controller
                      name={`remove_${orderItem.id}`}
                      control={control}
                      render={() => (
                        <RemoveIcon
                          sx={{ cursor: "pointer" }}
                          color="error"
                          fontSize="small"
                          onClick={() => handleChangeQuantity(orderItem.id, "decrease")}
                        />
                      )}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Card>
          ))}
        </Box>
      </Box>
      {/* <Box mt={3} width={"45%"}> */}
      <Box mt={3} width="45%" height={"100%"}>
        <Typography mb={2}>
          <b>Блюдо заведения</b>
        </Typography>
        <hr />
        {Object.entries(groupedByCategory).map(([categoryName, products]) => (
          <Accordion key={categoryName} expanded={expanded === categoryName} onChange={handleChange(categoryName)}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${categoryName}-content`}
              id={`${categoryName}-header`}
            >
              <Typography>
                <b>{categoryName}</b>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {products.map((product) => (
                <Box key={product.id}>
                  <Grid container alignItems="center" justifyContent={"space-between"} spacing={2}>
                    <Grid item xs={4}>
                      <Typography>{product.name}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography color="text.secondary">{product.price} сум</Typography>
                    </Grid>
                    <Controller
                      name={`add_${product.id}`}
                      control={control}
                      render={() => (
                        <Grid item xs={2}>
                          <AddIcon
                            onClick={() => handleAddToCart(product.id)}
                            color="secondary"
                            fontSize="medium"
                            // fontWeight="700"
                            sx={{ cursor: "pointer" }}
                          />
                        </Grid>
                      )}
                    />
                  </Grid>
                  <hr />
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};
