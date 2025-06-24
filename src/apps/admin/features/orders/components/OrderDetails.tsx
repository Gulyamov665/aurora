import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { Fade, CircularProgress } from "@mui/material";
import { OrdersType, UserInfoType } from "@store/user/types";
import { LazyGetCouriersQueryType } from "@store/admin/api/staffApi";
import { useForm } from "react-hook-form";
import { UpdateOrderMutationType } from "@store/admin/api/orders";
import { DetailsForm } from "./OrderDetailsForm";

interface OrderDetailsProps {
  order?: OrdersType;
  orderFetch: boolean;
  couriersResult: LazyGetCouriersQueryType[1];
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  updateOrder: UpdateOrderMutationType[0];
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({
  order,
  orderFetch,
  couriersResult,
  setOpenModal,
  updateOrder,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      courier_id: order?.courier?.id || 0,
      status: order?.status || "",
    },
  });

  const onSubmit = async (data: { courier_id: number; status: string }) => {
    if (!order?.id) return;

    const courier: UserInfoType | undefined = couriersResult?.data?.couriers?.find(
      (courier: UserInfoType) => courier.id === data.courier_id
    );

    try {
      await updateOrder({
        id: order?.id,
        body: {
          status: data.status,
          courier: {
            id: data.courier_id,
            username: `${courier?.first_name}  ${courier?.last_name}`,
            phone_number: courier?.phone,
          },
        },
      }).unwrap();
    } catch (error) {
      console.error("Ошибка обновления:", error);
    }
  };

  useEffect(() => {
    if (order) {
      reset({
        courier_id: order?.courier?.id || 0,
        status: order?.status || "",
      });
    }
  }, [order, reset]);

  if (orderFetch)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "468px" }}>
        <Fade in={orderFetch} unmountOnExit timeout={300}>
          <CircularProgress />
        </Fade>
      </Box>
    );

  return (
    <DetailsForm
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      order={order}
      couriersResult={couriersResult}
      setOpenModal={setOpenModal}
      isDirty={isDirty}
    />
  );
};
