import { AccessTime, Close, DoneOutline, Kitchen } from "@mui/icons-material";
import { Chip } from "@mui/material";

export const getStatusChip = (status: string) => {
  switch (status) {
    case "completed":
      return <Chip label="Готово" color="success" icon={<DoneOutline />} />;
    case "pending":
      return <Chip label="Ожидание" color="secondary" icon={<AccessTime />} />;
    case "canceled":
      return <Chip label="Отменено" color="error" icon={<Close />} />;
    case "prepare":
      return <Chip label="Готовиться" color="warning" icon={<Kitchen />} />;
    default:
      return <Chip label="Неизвестно" />;
  }
};
