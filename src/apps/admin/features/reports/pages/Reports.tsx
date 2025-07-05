import React, { useState } from "react";
import { Box } from "@mui/material";
import { useReportsMutation } from "@store/admin/api/reports";
import { useOutletContext } from "react-router-dom";
import { OutletContextType } from "@/apps/client/pages";
import { ReportsFilter } from "../components/ReportsFilter";
import { useGetCouriersQuery } from "@store/admin/api/staffApi";
import { skipToken } from "@reduxjs/toolkit/query";
import OrdersStats from "../components/OrderStats";
import OrdersTable from "../../orders/components/OrdersTable";

export const Reports: React.FC = () => {
  const { data: vendor } = useOutletContext<OutletContextType>();
  const [date, setDate] = useState<string[]>([]);
  const [reports, { data, isLoading }] = useReportsMutation();
  const { data: courierData } = useGetCouriersQuery(vendor?.id ?? skipToken);

  console.log(courierData);

  React.useEffect(() => {
    if (vendor) {
      handleSubmit();
    }
  }, [vendor]);

  const handleSubmit = async () => {
    try {
      const startDate = date[0];
      const endDate = date[1];
      const restaurantId = vendor.id;
      await reports({ startDate, endDate, restaurantId }).unwrap();
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
  };

  return (
    <Box className="container">
      <Box sx={{ ml: 2, mt: 2, boxShadow: 3, p: 2 }}>
        <ReportsFilter setDate={setDate} handleSubmit={handleSubmit} />
        <Box sx={{ mt: 2 }}>
          <OrdersStats
            totalSum={data?.sum}
            totalCount={data?.quantity}
            delivered={data?.delivered}
            cancelled={data?.canceled}
            fee={data?.fee_sum}
          />
        </Box>
        <OrdersTable data={data?.orders} isLoading={isLoading} />
      </Box>
    </Box>
  );
};
