import { useAddToCartMutation, useDecreaseItemMutation } from "@store/admin/api/orders";
import { useGetCartQuery, useRemoveCartMutation } from "@store/admin/api/orders";
import { OrdersList } from "../components/OrdersList";
import { OutletContextType } from "@/apps/client/pages";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import { authState } from "@store/user/slices/authSlice";
import Loading from "../../loading/Loading";
import { useMeQuery } from "@store/user/api/userAuthApi";

function OrdersPage() {
  const { data } = useOutletContext<OutletContextType>();
  const { isUser } = useSelector(authState);
  const skip = { skip: !data?.id || !isUser?.user_id };
  const { data: items, isLoading } = useGetCartQuery({ user: isUser?.user_id, vendorId: data?.id }, skip);
  const { data: user } = useMeQuery(isUser?.user_id ?? 0, { skip: !isUser?.user_id });
  const [addToCart] = useAddToCartMutation();
  const [decreaseItem] = useDecreaseItemMutation();
  const [removeCart] = useRemoveCartMutation();

  if (isLoading) return <Loading />;

  return (
    <div className="container">
      <OrdersList
        data={data}
        isUser={isUser}
        items={items}
        addToCart={addToCart}
        decreaseItem={decreaseItem}
        removeCart={removeCart}
        user={user}
      />
    </div>
  );
}

export default OrdersPage;
