import { FC } from "react";
import OrdersTable from "../components/OrdersTable";
import { useGetOrdersQuery } from "@store/admin/api/orders";

const Orders: FC = () => {
  const { data } = useGetOrdersQuery();

  return (
    <div className="container">
      <OrdersTable data={data} />
    </div>
  );
};

export default Orders;
