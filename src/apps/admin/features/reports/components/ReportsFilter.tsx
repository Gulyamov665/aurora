import React from "react";
import { DateRange } from "@/apps/common/DateRange";
import { AntDropdown } from "@/apps/common/AntDropdown";
import { Button } from "antd";
import { Box } from "@mui/material";
import { IReportsFilter } from "../types";

export const ReportsFilter: React.FC<IReportsFilter> = ({ setDate, handleSubmit }) => {
  return (
    <Box display={"flex"}>
      <DateRange setDate={setDate} onSubmit={handleSubmit} />
      <AntDropdown />
      <Button
        style={{
          marginRight: 16,
          marginLeft: 16,
        }}
        onClick={handleSubmit}
      >
        Отправить
      </Button>
    </Box>
  );
};
