import { FC, useEffect, useState } from "react";
import { useLazyGetOrderByIdQuery, useLazyGetOrdersQuery } from "@store/admin/api/orders";
import { useOutletContext } from "react-router-dom";
import { OutletContextType } from "@/apps/client/pages";
import { useOrderSocket } from "@/hooks/useOrderSocket";
import { useInView } from "react-intersection-observer";
import { OrdersType } from "@store/user/types";
import OrdersTable from "../components/OrdersTable";
import { MaterialModal } from "@/apps/common/Modal";
import { OrderDetails } from "../components/OrderDetails";

const Orders: FC = () => {
  const { data } = useOutletContext<OutletContextType>();
  const [page, setPage] = useState(1);
  const [allOrders, setAllOrders] = useState<OrdersType[]>([]);
  const [getOrders, { data: lazyData, isFetching }] = useLazyGetOrdersQuery();
  const [getOrderById, { data: orderData, isFetching: orderFetch }] = useLazyGetOrderByIdQuery();
  const { ref, inView } = useInView({ threshold: 0.5 });
  const [details, setDetails] = useState(false);

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

  useOrderSocket({ vendorId: data?.id, onOrderUpdate: () => getOrders({ vendorId: data.id, page: 1, limit: 10 }) });

  return (
    <div className="container">
      <OrdersTable
        data={allOrders}
        isLoading={isFetching}
        setDetails={setDetails}
        getOrderById={getOrderById}
        isFetching={isFetching}
      />
      <div ref={ref} style={{ height: 20 }} />

      <MaterialModal open={details} onClose={() => setDetails(false)}>
        <OrderDetails order={orderData} orderFetch={orderFetch} />
      </MaterialModal>
    </div>
  );
};

export default Orders;
