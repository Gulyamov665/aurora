import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import RedeemIcon from "@mui/icons-material/Redeem";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PersonIcon from '@mui/icons-material/Person';

export const buttonsInfo = [
  {
    text: "Заведение",
    icon: <RestaurantMenuIcon sx={{ fontSize: 35, color: "white" }} />,
    link: "main",
  },
  {
    text: "Персонал",
    icon: <PersonIcon sx={{ fontSize: 35, color: "white" }} />,
    link: "staff",
  },
  {
    text: "Меню",
    icon: <MenuBookIcon sx={{ fontSize: 35, color: "white" }} />,
    link: "menu",
  },
  {
    text: "Акции",
    icon: <RedeemIcon sx={{ fontSize: 35, color: "white" }} />,
    link: "promo",
  },
  {
    text: "Заказы",
    icon: <BorderColorIcon sx={{ fontSize: 35, color: "white" }} />,
    link: "orders",
  },
  {
    text: "Отчеты",
    icon: <ReceiptLongIcon sx={{ fontSize: 35, color: "white" }} />,
    link: "reports",
  },
];
