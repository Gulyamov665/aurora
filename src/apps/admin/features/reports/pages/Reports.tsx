import React, { useState } from "react";
import { Box } from "@mui/material";
import { DateRange } from "@/apps/common/DateRange";
// import OrdersTable from "../../orders/components/OrdersTable";

export const Reports: React.FC = () => {
  const [date, setDate] = useState<string[]>([]);

  console.log(date);

  return (
    <Box className="container">
      <Box sx={{ width: "100%", ml: 2, mt: 2, boxShadow: 3, p: 2 }}>
        <DateRange setDate={setDate} />

        {/* <OrdersTable data={} /> */}
      </Box>
    </Box>
  );
};
