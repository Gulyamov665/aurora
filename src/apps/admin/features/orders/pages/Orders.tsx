import { FC, useEffect } from "react";
import { useLazyGetOrdersQuery } from "@store/admin/api/orders";
import { useOutletContext } from "react-router-dom";
import { OutletContextType } from "@/apps/client/pages";
import { useOrderSocket } from "@/hooks/useOrderSocket";
import OrdersTable from "../components/OrdersTable";

const Orders: FC = () => {
  const { data } = useOutletContext<OutletContextType>();
  const [getOrders, { data: lazyData, isLoading }] = useLazyGetOrdersQuery();

  useEffect(() => {
    if (data) getOrders({ vendorId: data.id, page: 1, limit: 10 });
  }, [data]);

  useOrderSocket({ vendorId: data?.id, onOrderUpdate: getOrders });

  return (
    <div className="container">
      <OrdersTable data={lazyData} isLoading={isLoading} />
    </div>
  );
};

export default Orders;
