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

export default function OrdersList() {
  const { items } = useSelector(cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addCartItem, minusItem } = useActions();
  const { deleteItem, confirmedId } = useDelete();

  useEffect(() => {
    if (confirmedId) dispatch(removeCartItems());
  }, [confirmedId]);

  const removeItems = () => {
    deleteItem({ message: "все товари из корзины ?", type: "orders", id: 1 });
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
      </div>
    </div>
  );
}
