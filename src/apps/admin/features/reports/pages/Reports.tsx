import React, { useState } from "react";
import { Box } from "@mui/material";
import { DateRange } from "@/apps/common/DateRange";
import { useReportsMutation } from "@store/admin/api/reports";
// import OrdersTable from "../../orders/components/OrdersTable";
import { useOutletContext } from "react-router-dom";
import { OutletContextType } from "@/apps/client/pages";
import OrdersStats from "../components/OrderStats";

export const Reports: React.FC = () => {
  const { data: vendor } = useOutletContext<OutletContextType>();
  const [date, setDate] = useState<string[]>([]);
  const [reports, { data }] = useReportsMutation();

  const handleSubmit = async () => {
    try {
      const startDate = date[0];
      const endDate = date[1];
      const restaurantId = vendor.id; // Замените на нужный ID ресторана
      await reports({ startDate, endDate, restaurantId }).unwrap();
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
  };

  console.log(data);
  return (
    <Box className="container">
      <Box sx={{ ml: 2, mt: 2, boxShadow: 3, p: 2 }}>
        <DateRange setDate={setDate} onSubmit={handleSubmit} />

        <Box sx={{ mt: 2 }}>
          {/* <GridComponent sum={data?.sum} /> */}
          <OrdersStats totalSum={data?.sum} totalCount={data?.quantity} delivered={3} cancelled={data?.canceled} />
        </Box>
        {/* <OrdersTable data={data?.orders} isLoading={isLoading} /> */}
      </Box>
    </Box>
  );
};
