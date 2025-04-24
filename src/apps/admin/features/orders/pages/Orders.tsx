import { FC, useEffect, useState } from "react";
import { useLazyGetOrdersQuery } from "@store/admin/api/orders";
import { useOutletContext } from "react-router-dom";
import { OutletContextType } from "@/apps/client/pages";
import { useOrderSocket } from "@/hooks/useOrderSocket";
import OrdersTable from "../components/OrdersTable";
import { useInView } from "react-intersection-observer";
import { OrdersType } from "@store/user/types";
import { Box, CircularProgress, Fade } from "@mui/material";

const Orders: FC = () => {
  const { data } = useOutletContext<OutletContextType>();
  const [page, setPage] = useState(1);
  const [allOrders, setAllOrders] = useState<OrdersType[]>([]);
  const [getOrders, { data: lazyData, isFetching }] = useLazyGetOrdersQuery();
  const { ref, inView } = useInView({ threshold: 0.5 });

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
      <OrdersTable data={allOrders} isLoading={isFetching} />
      <div ref={ref} style={{ height: 20 }} />
      {isFetching && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Fade in={isFetching} unmountOnExit timeout={300}>
            <CircularProgress />
          </Fade>
        </Box>
      )}
    </div>
  );
};

export default Orders;
