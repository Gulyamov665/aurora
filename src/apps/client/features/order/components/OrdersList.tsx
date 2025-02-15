import { addCartItem, cart, minusItem, removeCartItems } from "@store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import OrderProducts from "./OrderProducts";
import emptyCart from "@/assets/emptyCard.jpg";
import styles from "../assets/Orders.module.scss";

export default function OrdersList() {
  const { items } = useSelector(cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const removeItems = () => {
    if (confirm("Удалить все товари из корзины ?")) dispatch(removeCartItems());
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
                increase={() => dispatch(addCartItem(product))}
                decrease={() => dispatch(minusItem(product))}
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
