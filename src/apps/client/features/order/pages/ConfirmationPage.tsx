import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { ConfirmOrder } from "../components/ConfirmOrder";
import { OutletContextType } from "@/apps/client/pages";
import { authState } from "@store/user/slices/authSlice";
import { useSelector } from "react-redux";
import { useCreateOrderMutation, useGetCartQuery } from "@store/admin/api/orders";
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
      const orderData = {
        created_by: isUser?.user_id,
        lat: "40.7128",
        long: "-74.0060",
        user_id: isUser?.user_id,
        orders_chat_id: data.orders_chat_id,
        restaurant: { id: data.id, name: data.name, address: data.address, photo: data.logo, phone: 998934567890 },
        status: "new",
        products: items.products,
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
