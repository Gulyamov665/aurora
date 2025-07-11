import { NavbarBottomPageProps } from "../interfaces/interface";
import { FC } from "react";
import { useGetCartQuery } from "@store/admin/api/orders";
import { useSelector } from "react-redux";
import { authState } from "@store/user/slices/authSlice";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavbarBottom } from "../components/NavbarBottom";
import { CartItem } from "@store/user/types";

const NavbarBottomPage: FC<NavbarBottomPageProps> = ({ data, user }) => {
  const { isUser } = useSelector(authState);
  const skip = { skip: !data?.id || !isUser?.user_id };
  const { data: items, isFetching } = useGetCartQuery({ user: isUser?.user_id, vendorId: data?.id }, skip);
  const { ["*"]: current } = useParams();
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    if (items?.products?.length > 0 && isUser && current !== "confirm" && current !== "maps") {
      setShowNavbar(true);
    } else {
      setShowNavbar(false);
    }
  }, [items?.products?.length, current, isUser]);

  const itemsQuantity = (): number => {
    return items?.products.reduce((sum: number, item: CartItem): number => sum + (item.quantity ?? 0), 0);
  };

  return (
    <div>
      <NavbarBottom
        items={items}
        isUser={isUser}
        current={current}
        visible={showNavbar}
        user={user}
        itemsQuantity={itemsQuantity}
        deliveryPrice={items?.delivery_price}
        isLoading={isFetching}
      />
    </div>
  );
};

export default NavbarBottomPage;
