import InventoryIcon from "@mui/icons-material/Inventory";
import ElectricMopedIcon from "@mui/icons-material/ElectricMoped";
import PeopleIcon from "@mui/icons-material/People";
import AppsIcon from "@mui/icons-material/Apps";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import DataThresholdingIcon from "@mui/icons-material/DataThresholding";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// import PieChartIcon from "@mui/icons-material/PieChart";

export const buttonGroups = [
  {
    title: "Управление",
    icon: <DashboardIcon sx={{ color: "white" }} />,
    nested: true,
    buttons: [
      { text: "Заведение", icon: <FoodBankIcon sx={{ color: "white" }} />, link: "main" },
      { text: "Персонал", icon: <PeopleIcon sx={{ color: "white" }} />, link: "employees" },
      { text: "Доставка", icon: <LocalShippingIcon sx={{ color: "white" }} />, link: "delivery" },
    ],
  },
  {
    title: "Контент",
    icon: <FactCheckIcon sx={{ color: "white" }} />,
    buttons: [
      { text: "Меню", icon: <AppsIcon sx={{ color: "white" }} />, link: "menu" },
      { text: "Акции", icon: <DataThresholdingIcon sx={{ color: "white" }} />, link: "promo" },
      { text: "Заказы", icon: <ElectricMopedIcon sx={{ color: "white" }} />, link: "orders" },
    ],
  },
  {
    title: "Отчетность",
    icon: <AssessmentIcon sx={{ color: "white" }} />,
    nested: true,
    buttons: [
      // { text: "Сводка", icon: <PieChartIcon sx={{ color: "white" }} />, link: "summary" },
      { text: "Отчет по заказам", icon: <InventoryIcon sx={{ color: "white" }} />, link: "reports" },
    ],
  },
];
