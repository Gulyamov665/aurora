import { IconItem, NavbarBottomPageProps } from "../interfaces/interface";
import { FC } from "react";
import { useGetCartQuery } from "@store/admin/api/orders";
import { useSelector } from "react-redux";
import { authState } from "@store/user/slices/authSlice";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenu";
import DeliveryDiningOutlinedIcon from "@mui/icons-material/DeliveryDiningOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import NavbarBottom from "../components/NavbarBottom";

const NavbarBottomPage: FC<NavbarBottomPageProps> = ({ data }) => {
  const { isUser } = useSelector(authState);
  const { data: items } = useGetCartQuery(
    { user: isUser?.user_id, vendorId: data?.id },
    { skip: !data?.id || !isUser?.user_id }
  );

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
      counter: isUser && items?.products?.length,
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
