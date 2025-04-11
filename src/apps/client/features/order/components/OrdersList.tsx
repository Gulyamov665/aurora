import { FC, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDelete } from "@/hooks/useDelete";
import { useEffect } from "react";
import { CartItem } from "@store/user/types";
import { handleAddToCart } from "@/Utils/tools";
import { OrderProps } from "../types/orderTypes";
import { CostBox } from "./CostBox";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import OrderProducts from "./OrderProducts";
import emptyCart from "@/assets/emptyCard.jpg";
import styles from "../assets/Orders.module.scss";

export const OrdersList: FC<OrderProps> = ({ data, isUser, items, addToCart, decreaseItem, removeCart }) => {
  const { deleteItem, confirmedId } = useDelete();
  const navigate = useNavigate();

  useEffect(() => {
    if (confirmedId) removeCart(items.id).unwrap();
  }, [confirmedId]);

  const removeItems = () => {
    deleteItem({ message: "очистить корзину ?", type: "orders", id: 1 });
  };

  const toConfirmPage = () => {
    navigate("../confirm", { state: { from: location.pathname } });
  };

  const increase = (event: MouseEvent<HTMLButtonElement>, productData: CartItem) => {
    if (!isUser?.user_id || !data?.id) return;

    handleAddToCart({
      event,
      productData,
      userId: isUser?.user_id,
      restaurantId: data.id,
      addToCart,
    });
  };

  const decrease = (product: CartItem) => {
    if (!isUser?.user_id || !data?.id) return;
    decreaseItem({
      product_id: product.id,
      user_id: isUser?.user_id,
      restaurant_id: data.id,
    });
  };

  return (
    <div>
      <div className={styles["page"]}>
        <div className={styles["buttons-box"]}>
          <div className="mx-3" onClick={() => navigate("..")}>
            <ArrowBackIcon sx={{ fontSize: "30px" }} />
          </div>
          {items && (
            <div onClick={removeItems} style={{ cursor: "pointer" }}>
              <DeleteIcon />
            </div>
          )}
        </div>
        {items && items?.products?.length > 0 ? (
          <div>
            {items.products.map((product: CartItem) => (
              <OrderProducts
                product={product}
                key={product.id}
                increase={increase}
                decrease={() => decrease(product)}
              />
            ))}
            <CostBox items={items} toConfirmPage={toConfirmPage} />
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
};
