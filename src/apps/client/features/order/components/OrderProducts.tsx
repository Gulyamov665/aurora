import { FC } from "react";
// import RemoveIcon from "@mui/icons-material/Remove";
// import AddIcon from "@mui/icons-material/Add";
import { OrderProductsProps } from "../types/orderTypes";
import { Container, Typography, Card, CardMedia, CardContent, CardActions, IconButton, Grow } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { motion } from "framer-motion";

const OrderProducts: FC<OrderProductsProps> = ({ product, increase, decrease }) => {
  return (
    // <div
    //   className="d-flex justify-content-between align-items-center "
    //   style={{
    //     borderRadius: "20px",
    //     width: "100%",
    //     padding: "10px",
    //     margin: "5px 0",
    //     backgroundColor: "#F8FBFF",
    //   }}
    // >
    //   <div className="d-flex align-items-center">
    //     <img
    //       src={product.photo}
    //       alt="photo"
    //       width={100}
    //       height={100}
    //       style={{ borderRadius: "20px", objectFit: "cover" }}
    //     />
    //     <div className="mx-2">
    //       <b>{product.name}</b>
    //     </div>
    //   </div>
    //   <div className="btn-group bg-white ordersPageBtn">
    //     <button className={"btn text-danger "} onClick={decrease}>
    //       <RemoveIcon sx={{ fontSize: 20, color: "black" }} />
    //     </button>

    //     <button className="btn text-black">{product.count}</button>

    //     <button className="btn text-success" onClick={increase}>
    //       <AddIcon sx={{ fontSize: 20, color: "black" }} />
    //     </button>
    //   </div>
    // </div>
    <Container maxWidth="md" sx={{ mt: 0 }}>
      <Grow in key={product.id} timeout={500}>
        <Card
          sx={{
            display: "flex",
            height: 130,
            mb: 2,
            p: 2,
            borderRadius: 3,
            boxShadow: 3,
            transition: "0.3s",
            "&:hover": { boxShadow: 6 },
          }}
        >
          <CardMedia component="img" image={product.photo} alt={product.name} sx={{ width: 120, borderRadius: 2 }} />
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight="bold">
              {product.price} сум
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {product.name}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton color="primary" onClick={decrease}>
              <Remove />
            </IconButton>
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.2 }}>
              <Typography variant="h6">{product.count}</Typography>
            </motion.div>
            <IconButton color="primary" onClick={increase}>
              <Add />
            </IconButton>
          </CardActions>
        </Card>
      </Grow>

      {/* <Divider sx={{ my: 2 }} /> */}
      {/* <Typography variant="h6" fontWeight="bold" align="right">
        Итог: 20000 сум
      </Typography> */}

      {/* <Button variant="contained" color="primary" fullWidth sx={{ mt: 2, borderRadius: 3 }}>
        Оформить заказ
      </Button> */}
    </Container>
  );
};

export default OrderProducts;
