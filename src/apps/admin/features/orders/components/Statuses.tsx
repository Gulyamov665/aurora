import { AccessTime, Close, DoneOutlined, Kitchen, Fastfood } from "@mui/icons-material";
import { Chip } from "@mui/material";

export const getStatusChip = (status: string) => {
  switch (status) {
    case "new":
      return <Chip label="Новый" color="success" icon={<Fastfood />} />;
    case "completed":
      return <Chip label="Готово" color="success" icon={<DoneOutlined />} />;
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
