import { AccessTime, Close, DoneOutlined, Kitchen, Fastfood, LocalShipping } from "@mui/icons-material";
import { Chip } from "@mui/material";

export const getStatusChip = (status: string) => {
  switch (status) {
    case "new":
      return <Chip label="Новый" color="success" icon={<Fastfood />} />;
    case "completed":
      return (
        <Chip label="Завершен" sx={{ background: "black", color: "#ffffff" }} icon={<DoneOutlined color="success" />} />
      );
    case "awaiting_courier":
      return <Chip label="Ожидание курьера" color="secondary" icon={<AccessTime />} />;
    case "canceled":
      return <Chip label="Отменен" color="error" icon={<Close />} />;
    case "prepare":
      return <Chip label="Готовиться" color="warning" icon={<Kitchen />} />;
    case "on_the_way":
      return <Chip label="Доставляется" color="primary" icon={<LocalShipping />} />;
    default:
      return <Chip label="Неизвестно" />;
  }
};

export const getStatusChipNoIcons = (status: string) => {
  switch (status) {
    case "new":
      return <Chip label="Новый" color="success" />;
    case "completed":
      return <Chip label="Доставлено" sx={{ background: "black", color: "#ffffff" }} />;
    case "awaiting_courier":
      return <Chip label="Ожидание курьера" color="secondary" />;
    case "canceled":
      return <Chip label="Отменен" color="error" />;
    case "prepare":
      return <Chip label="Готовиться" color="warning" />;
    case "on_the_way":
      return <Chip label="Доставляется" color="primary" />;
    default:
      return <Chip label="Неизвестно" />;
  }
};

export const ORDER_STATUS_LABELS: Record<string, string> = {
  new: "Новый",
  prepare: "Готовиться",
  awaiting_courier: "Ожидание",
  on_the_way: "Доставляется",
  completed: "Готово",
  canceled: "Отменен",
};
