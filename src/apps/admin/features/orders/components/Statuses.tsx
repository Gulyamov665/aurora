import { AccessTime, Close, DoneOutlined, Kitchen, Fastfood, LocalShipping } from "@mui/icons-material";
import { Chip } from "@mui/material";
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';

export const getStatusChip = (status: string) => {
  switch (status) {
    case "new":
      return <Chip label="Новый" color="success" icon={<Fastfood />} />;
    case "completed":
      return <Chip label="Готово" color="success" icon={<DoneOutlined />} />;
    case "awaiting_courier":
      return <Chip label="Ожидание" color="secondary" icon={<AccessTime />} />;
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
      return <Chip label="Готово" color="success" />;
    case "awaiting_courier":
      return <Chip label="Ожидание" color="secondary" />;
    case "canceled":
      return <Chip label="Отменен" color="error" />;
    case "prepare":
      return <Chip label="Готовиться" color="warning" />;
    default:
      return <Chip label="Неизвестно" />;
  }
};
