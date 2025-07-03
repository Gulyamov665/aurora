import { FC, MouseEvent } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useDelete } from "@/hooks/useDelete";
import { useEffect } from "react";
import { CartItem } from "@store/user/types";
import { handleAddToCart, updateCartCache } from "@/Utils/tools";
import { OrderProps } from "../types/orderTypes";
import { EmptyCart } from "../../../../../animations/componets/EmptyCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import OrderProducts from "./OrderProducts";
import styles from "../assets/Orders.module.scss";
import { AppDispatch } from "@store/index";
import { useDispatch } from "react-redux";

export const OrdersList: FC<OrderProps> = ({ data, isUser, items, addToCart, decreaseItem, removeCart }) => {
  const { deleteItem, confirmedId } = useDelete();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (confirmedId) removeCart(confirmedId).unwrap();
  }, [confirmedId]);

  if (!isUser) return <Navigate to=".." />;

  const removeItems = () => {
    deleteItem({ message: "очистить корзину ?", type: "orders", id: items.id });
  };

  const increase = (event: MouseEvent<HTMLButtonElement>, productData: CartItem, quantity: number) => {
    if (!isUser?.user_id || !data?.id) return;

    updateCartCache(dispatch, isUser.user_id, data.id, productData);

    handleAddToCart({
      event,
      productData,
      quantity,
      userId: isUser?.user_id,
      restaurantId: data.id,
      addToCart,
    });
  };

  const decrease = (product: CartItem) => {
    if (!isUser?.user_id || !data?.id) return;

    decreaseItem({
      product: product,
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
                key={product.options ? product.options.id : product.id}
                increase={increase}
                decrease={() => decrease(product)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center" style={{ marginTop: 100 }}>
            <EmptyCart />
            <p style={{ marginTop: 50 }}>
              <b>Ваша корзина пока пуста</b>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
