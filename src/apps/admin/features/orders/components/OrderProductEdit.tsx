import * as React from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box } from "@mui/material";
import { Typography } from "@mui/material";
import { OrderContentList } from "./OrderContentList";
import { OrderProductEditProps } from "../types";
import { OrderProductsList } from "./OrderProductsList";
import { OrderVariantsDropdown } from "./OrderVariantsDropdown";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const OrderProductEdit: React.FC<OrderProductEditProps> = (props) => {
  const { productsResult, orderProducts, control, handleChangeOrder, orderId } = props;

  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [showOptions, setShowOptions] = React.useState(false);

  
  const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleChangeQuantity = async (productId: number, type: string, optionId?: number) => {
    const body = {
      id: orderId ?? 0,
      product_id: productId,
      type,
      option_id: optionId,
    };
    await handleChangeOrder(body).unwrap();
  };

  return (
    <Box display={"flex"} width={"100%"} height={800} justifyContent={"space-around"}>
      <Box mt={3} width={"50%"} height={"100%"}>
        <Typography>
          <b>Состав заказа</b>
        </Typography>
        <hr />
        <OrderContentList handleChangeQuantity={handleChangeQuantity} orderProducts={orderProducts} control={control} />
      </Box>

      <Box mt={3} width="45%" height={"100%"}>
        <Typography mb={2}>
          <b>Меню</b>
        </Typography>
        <hr />
        {Object.entries(productsResult)?.map(([categoryName, products]) => (
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
                  <OrderProductsList
                    showOptions={showOptions}
                    setShowOptions={setShowOptions}
                    handleAddProduct={handleChangeQuantity}
                    product={product}
                    control={control}
                  />
                  <hr />
                  {showOptions && (
                    <OrderVariantsDropdown
                      handleChangeQuantity={handleChangeQuantity}
                      variants={product.options.variants}
                      id={product.id}
                    />
                  )}
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};
