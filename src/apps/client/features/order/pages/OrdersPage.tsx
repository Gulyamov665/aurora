import {
  useAddToCartMutation,
  useDecreaseItemMutation,
  useGetCartQuery,
  useRemoveCartMutation,
} from "@store/admin/api/orders";
import { OrdersList } from "../components/OrdersList";
import { OutletContextType } from "@/apps/client/pages";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import { authState } from "@store/user/slices/authSlice";

function OrdersPage() {
  const { data } = useOutletContext<OutletContextType>();
  const { isUser } = useSelector(authState);
  const skip = { skip: !data?.id || !isUser?.user_id };
  const { data: items } = useGetCartQuery({ user: isUser?.user_id, vendorId: data?.id }, skip);
  const [addToCart] = useAddToCartMutation();
  const [decreaseItem] = useDecreaseItemMutation();
  const [removeCart] = useRemoveCartMutation();

  return (
    <div className="container">
      <OrdersList data={data} isUser={isUser} items={items} addToCart={addToCart} decreaseItem={decreaseItem} removeCart={removeCart} />
    </div>
  );
}

export default OrdersPage;
