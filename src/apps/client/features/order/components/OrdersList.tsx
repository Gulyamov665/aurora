import { cart, removeCartItems } from "@store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import OrderProducts from "./OrderProducts";
import emptyCart from "@/assets/emptyCard.jpg";
import styles from "../assets/Orders.module.scss";
import { useActions } from "@/hooks/useActions";
import { useDelete } from "@/hooks/useDelete";
import { useEffect } from "react";
import { useCreateOrderMutation } from "@store/admin/api/orders";
import { Button } from "@mui/material";

export default function OrdersList() {
  const { items } = useSelector(cart);
  const { addCartItem, minusItem } = useActions();
  const { deleteItem, confirmedId } = useDelete();
  const [createOrder] = useCreateOrderMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (confirmedId) dispatch(removeCartItems());
  }, [confirmedId]);

  const removeItems = () => {
    deleteItem({ message: "все товари из корзины ?", type: "orders", id: 1 });
  };

  const handleCreateOrder = async () => {
    const itemsWithoutPhoto = items.map(({ photo, ...rest }) => rest);
    const orderData = {
      created_by: "User83",
      lat: "40.7128",
      long: "-74.0060",
      user_id: 182,
      restaurant: 73,
      status: "pending",
      products: itemsWithoutPhoto,
    };
    await createOrder(orderData).unwrap();
  };

  return (
    <div>
      <div className={styles["page"]}>
        <div className={styles["buttons-box"]}>
          <div className="mx-3" onClick={() => navigate(-1)}>
            <ArrowBackIcon sx={{ fontSize: "30px" }} />
          </div>
          {items.length > 0 && (
            <div onClick={removeItems} style={{ cursor: "pointer" }}>
              <DeleteIcon />
            </div>
          )}
        </div>
        {items.length > 0 ? (
          <div>
            {items.map((product) => (
              <OrderProducts
                product={product}
                key={product.id}
                increase={() => addCartItem(product)}
                decrease={() => minusItem(product)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center">
            <img src={emptyCart} alt="cart" className={styles["empty-cart"]} />
            <p>
              <b>Ваша корзина пока пуста</b>
            </p>
          </div>
        )}
        <Button onClick={handleCreateOrder}>Оформить заказ</Button>
      </div>
    </div>
  );
}
