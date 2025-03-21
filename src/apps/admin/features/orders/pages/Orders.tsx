import { FC, useEffect } from "react";
import OrdersTable from "../components/OrdersTable";
import {  useLazyGetOrdersQuery } from "@store/admin/api/orders";
import { socket } from "@store/admin/api/orders";

const Orders: FC = () => {
  // const { data } = useGetOrdersQuery();
  const [getOrders, { data: lazyData }] = useLazyGetOrdersQuery();

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    socket.on("new_order", (newOrder) => {
      console.log("📦 Новый заказ по сокету:", newOrder);
      getOrders();
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
