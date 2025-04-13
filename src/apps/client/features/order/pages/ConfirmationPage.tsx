import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { ConfirmOrder } from "../components/ConfirmOrder";
import { OutletContextType } from "@/apps/client/pages";
import { authState } from "@store/user/slices/authSlice";
import { useSelector } from "react-redux";
import { useCreateOrderMutation, useGetCartQuery } from "@store/admin/api/orders";
import { CartItem } from "@store/user/types";
import OrderSuccess from "../components/OrderSuccess";
import { useState } from "react";

const OrderConfirmationPage: React.FC = () => {
  const { data } = useOutletContext<OutletContextType>();
  const { isUser } = useSelector(authState);
  const skip = { skip: !data?.id || !isUser?.user_id };
  const { data: items } = useGetCartQuery({ user: isUser?.user_id, vendorId: data?.id }, skip);
  const [createOrder] = useCreateOrderMutation();
  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();
  const { state } = useLocation();

  const handleCreateOrder = async () => {
    try {
      const itemsWithoutPhoto = items.products.map(({ photo, ...rest }: CartItem) => rest);
      const orderData = {
        created_by: isUser?.user_id,
        lat: "40.7128",
        long: "-74.0060",
        user_id: isUser?.user_id,
        restaurant: data.id,
        status: "new",
        products: itemsWithoutPhoto,
      };
      await createOrder(orderData).unwrap();
      setShowSuccess(true);
      setTimeout(() => {
        navigate("..");
      }, 2000);
    } catch (error) {
      console.error("Failed to create order:", error);
    }
  };

  return (
    <>
      <ConfirmOrder navigate={navigate} state={state} handleCreateOrder={handleCreateOrder} items={items} />
      {showSuccess && <OrderSuccess />}
    </>
  );
};

export default OrderConfirmationPage;
