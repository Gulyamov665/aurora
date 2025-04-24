import React from "react";
import { ConfigProvider, DatePicker } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import type { Dayjs } from "dayjs";
import ruRU from "antd/locale/ru_RU";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { Box } from "@mui/material";

dayjs.locale("ru");

type DateRangeProps = {
  setDate: React.Dispatch<React.SetStateAction<string[]>>;
};

export const DateRange: React.FC<DateRangeProps> = ({ setDate }) => {
  const smileIcon = <SmileOutlined />;
  const { RangePicker } = DatePicker;

  const onChange = (_date: Dayjs | (Dayjs | null)[] | null, dateString: string[]) => {
    setDate(dateString);
  };
  return (
    <div>
      <ConfigProvider locale={ruRU}>
        <Box>
          <RangePicker suffixIcon={smileIcon} onChange={onChange} />
        </Box>
      </ConfigProvider>
    </div>
  );
};
