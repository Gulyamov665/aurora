import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenu";
import DeliveryDiningOutlinedIcon from "@mui/icons-material/DeliveryDiningOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import NavbarBottom from "../components/NavbarBottom";
import { useSelector } from "react-redux";
import { IconItem, NavbarBottomPageProps } from "../interfaces/interface";
import { cart } from "@store/cartSlice";
import { FC } from "react";

const NavbarBottomPage: FC<NavbarBottomPageProps> = ({ data }) => {
  const { items } = useSelector(cart);

  const active = data?.availability_orders || false;

  const options = { fontSize: 30 };

  const icons: IconItem[] = [
    {
      icon: <RestaurantMenuOutlinedIcon sx={options} />,
      title: "Меню",
      link: "..",
      active: true,
    },
    {
      icon: <ShoppingCartOutlinedIcon sx={options} />,
      title: "Корзина",
      link: "cart",
      counter: items.length,
      active: true,
    },
    {
      icon: <DeliveryDiningOutlinedIcon sx={options} />,
      title: "Заказы",
      link: "orders",
      active,
    },
    {
      icon: <AssignmentIndOutlinedIcon sx={options} />,
      title: "Профиль",
      link: "profile",
      active,
    },
  ];

  return (
    <div>
      <NavbarBottom icons={icons} />
    </div>
  );
};

export default NavbarBottomPage;
