import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { ConfirmOrder } from "../components/ConfirmOrder";
import { OutletContextType } from "@/apps/client/pages";
import { authState } from "@store/user/slices/authSlice";
import { useSelector } from "react-redux";
import { useCreateOrderMutation, useGetCartQuery } from "@store/admin/api/orders";
import { CartItem } from "@store/user/types";

const OrderConfirmationPage: React.FC = () => {
  const { data } = useOutletContext<OutletContextType>();
  const { isUser } = useSelector(authState);
  const skip = { skip: !data?.id || !isUser?.user_id };
  const { data: items } = useGetCartQuery({ user: isUser?.user_id, vendorId: data?.id }, skip);
  const [createOrder] = useCreateOrderMutation();

  const navigate = useNavigate();
  const { state } = useLocation();

  console.log(items);
  const handleCreateOrder = async () => {
    const itemsWithoutPhoto = items.products.map(({ photo, ...rest }: CartItem) => rest);
    const orderData = {
      created_by: isUser?.user_id,
      lat: "40.7128",
      long: "-74.0060",
      user_id: 2,
      restaurant: data.id,
      status: "new",
      products: itemsWithoutPhoto,
    };
    await createOrder(orderData).unwrap();
  };

  return <ConfirmOrder navigate={navigate} state={state} handleCreateOrder={handleCreateOrder} items={items} />;
};

export default OrderConfirmationPage;
