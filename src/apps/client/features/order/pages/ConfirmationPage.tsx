import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { ConfirmOrder } from "../components/ConfirmOrder";
import { OutletContextType } from "@/apps/client/pages";
import { authState } from "@store/user/slices/authSlice";
import { useSelector } from "react-redux";
import { useCreateOrderMutation, useGetCartQuery } from "@store/admin/api/orders";
import OrderSuccess from "../components/OrderSuccess";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMeQuery } from "@store/user/api/userAuthApi";

import { LocationData } from "../../map/types";

const OrderConfirmationPage: React.FC = () => {
  const { data } = useOutletContext<OutletContextType>();
  const { isUser } = useSelector(authState);
  const skip = { skip: !data?.id || !isUser?.user_id };
  const { data: items } = useGetCartQuery({ user: isUser?.user_id, vendorId: data?.id }, skip);
  const { data: me } = useMeQuery(isUser?.user_id ?? 0, { skip: !isUser?.user_id });
  const { register, reset, watch } = useForm<LocationData>();
  const [createOrder] = useCreateOrderMutation();
  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (me) {
      reset({
        name: me.location?.name || me.location?.address,
        phone: me.phone,
        address: me.location?.address || "",
        apartment: me.location?.apartment || "",
        entrance: me.location?.entrance || "",
        floor: me.location?.floor || "",
        comment: me.location?.comment || "",
      });
    }
  }, [me, reset]);

  const handleCreateOrder = async () => {
    try {
      const orderData = {
        created_by: isUser?.user_id,
        lat: me?.location?.lat,
        long: me?.location?.long,
        user_id: isUser?.user_id,
        orders_chat_id: data.orders_chat_id,
        restaurant: {
          id: data.id,
          name: data.name,
          address: data.address,
          photo: data.logo,
          phone: me?.phone,
        },
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
      <ConfirmOrder
        navigate={navigate}
        state={state}
        handleCreateOrder={handleCreateOrder}
        items={items}
        register={register}
        watch={watch}
      />
      {showSuccess && <OrderSuccess />}
    </>
  );
};

export default OrderConfirmationPage;
