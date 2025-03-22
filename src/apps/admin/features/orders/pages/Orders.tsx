import { FC, useEffect } from "react";
import OrdersTable from "../components/OrdersTable";
import { useLazyGetOrdersQuery } from "@store/admin/api/orders";
import { socket } from "@store/admin/api/orders";
import { useOutletContext } from "react-router-dom";
import { OutletContextType } from "@/apps/client/pages";

const Orders: FC = () => {
  // const { data } = useGetOrdersQuery();
  const { data } = useOutletContext<OutletContextType>();
  const [getOrders, { data: lazyData }] = useLazyGetOrdersQuery();

  console.log(data?.id);

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    socket.on("new_order", (newOrder) => {
      console.log("📦 Новый заказ по сокету:", newOrder);
      if (newOrder.restaurant === data?.id) getOrders();
    });

    return () => {
      socket.off("new_order");
    };
  }, [socket]);

  return (
    <div className="container">
      <OrdersTable data={lazyData} />
    </div>
  );
};

export default Orders;
