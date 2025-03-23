import { FC, useEffect } from "react";
import OrdersTable from "../components/OrdersTable";
import { useLazyGetOrdersQuery } from "@store/admin/api/orders";
import { socket } from "@store/admin/api/orders";
import { useOutletContext } from "react-router-dom";
import { OutletContextType } from "@/apps/client/pages";

const Orders: FC = () => {
  const { data } = useOutletContext<OutletContextType>();
  const [getOrders, { data: lazyData, isLoading }] = useLazyGetOrdersQuery();

  useEffect(() => {
    if (data) getOrders();
  }, [data]);

  console.log(isLoading);

  useEffect(() => {
    socket.on("new_order", (newOrder) => {
      console.log("📦 Новый заказ по сокету:", newOrder);
      console.log(data);
      if (newOrder.restaurant === data.id) getOrders();
    });

    return () => {
      socket.off("new_order");
    };
  }, [data, socket]);

  return (
    <div className="container">
      <OrdersTable data={lazyData} isLoading={isLoading} />
    </div>
  );
};

export default Orders;
