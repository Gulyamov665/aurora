import { FC, useEffect, useRef, useState } from "react";
import { useChangeOrderMutation, useLazyGetOrderByIdQuery } from "@store/admin/api/orders";
import { useLazyGetOrdersQuery, useUpdateOrderMutation } from "@store/admin/api/orders";
import { useOutletContext } from "react-router-dom";
import { OutletContextType } from "@/apps/client/pages";
import { useOrderSocket } from "@/hooks/useOrderSocket";
import { useInView } from "react-intersection-observer";
import { OrdersType } from "@store/user/types";
import OrdersTable from "../components/OrdersTable";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { OrderDetails } from "../components/OrderDetails";
//@ts-ignore
import notificationSound from "@/assets/notification/notification.mp3";
import { Box, Drawer } from "@mui/material";
import { useLazyGetCouriersQuery } from "@store/admin/api/staffApi";
import { MaterialModal } from "../../../../common/Modal";
import { OrderProductEdit } from "../components/OrderProductEdit";
import { useLazyGetProductsQuery } from "@store/admin/api/productsApi";
import { FormProvider, useForm } from "react-hook-form";
import { styles } from "../assets/styles";

const Orders: FC = () => {
  const { data } = useOutletContext<OutletContextType>();
  const [page, setPage] = useState(1);
  const [allOrders, setAllOrders] = useState<OrdersType[]>([]);
  const [getOrders, { data: lazyData, isFetching }] = useLazyGetOrdersQuery();
  const [getCouriers, couriersResult] = useLazyGetCouriersQuery();
  const [updateOrder] = useUpdateOrderMutation();
  const [getProducts, productsResult] = useLazyGetProductsQuery();
  const [handleChangeOrder] = useChangeOrderMutation();

  const [getOrderById, { data: orderData, isFetching: orderFetch }] = useLazyGetOrderByIdQuery();
  const { ref, inView } = useInView({ threshold: 0.5 });
  const [soundAllowed, setSoundAllowed] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(notificationSound);
  }, []);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (data && page === 1) {
      getOrders({ vendorId: data.id, page, limit: 10 });
    }
  }, [data]);

  useEffect(() => {
    if (inView && !isFetching && lazyData?.data?.length) {
      setPage((prev) => prev + 1);
    }
  }, [inView]);

  useEffect(() => {
    if (page > 1 && data) {
      getOrders({ vendorId: data.id, page, limit: 10 });
    }
  }, [page]);

  useEffect(() => {
    if (lazyData?.data) {
      setAllOrders((prev) => {
        const newIds = lazyData.data.map((item) => item.id);
        const withoutDuplicates = prev.filter((item) => !newIds.includes(item.id));
        return [...withoutDuplicates, ...lazyData.data];
      });
    }
  }, [lazyData]);

  useOrderSocket({
    vendorId: data?.id,
    onOrderUpdate: () => {
      getOrders({ vendorId: data.id, page: 1, limit: 10 });
      if (soundAllowed && audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((e) => {
          console.warn("Не удалось воспроизвести звук", e);
        });
      }
    },
  });

  const onEyeClick = async (id: number) => {
    setDrawerOpen(true); // это теперь setDrawerOpen
    await getOrderById(id).unwrap();
    await getProducts({ res: data.name }).unwrap();
    await getCouriers(data.id).unwrap();
  };

  const methods = useForm({
    defaultValues: {
      product_ids: orderData?.products.map((p) => p.id) || [],
    },
  });

  const onSubmit = async (data: { product_ids: object }) => {
    if (!orderData?.id) return;
    try {
      console.log(data);
      // alert("Обновлен");
    } catch (error) {
      console.error("Ошибка обновления:", error);
      // alert("Обновлен");
    }
  };

  return (
    <Box
      className="container"
      sx={{
        transition: "0.3s",
        marginRight: drawerOpen ? "495px" : "80px",
      }}
    >
      <OrdersTable
        data={allOrders}
        isLoading={isFetching}
        onEyeClick={onEyeClick}
        isFetching={isFetching}
        setSoundAllowed={setSoundAllowed}
        audioRef={audioRef}
        soundAllowed={soundAllowed}
      />

      <div ref={ref} style={{ height: 20 }} />

      <Drawer anchor="right" open={drawerOpen} variant="persistent" sx={styles.drawerStyles}>
        <Box display="flex" justifyContent="flex-end" px={2}>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <OrderDetails
          setOpenModal={setOpenModal}
          order={orderData}
          orderFetch={orderFetch}
          couriersResult={couriersResult}
          updateOrder={updateOrder}
        />
      </Drawer>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <MaterialModal open={openModal} onClose={() => setOpenModal(false)} width="80%">
            <OrderProductEdit
              productsResult={productsResult.data ?? []}
              orderProducts={orderData?.products || []}
              orderId={orderData?.id}
              control={methods.control}
              handleChangeOrder={handleChangeOrder}
            />
          </MaterialModal>
        </form>
      </FormProvider>
    </Box>
  );
};

export default Orders;
