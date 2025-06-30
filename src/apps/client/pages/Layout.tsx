import { Outlet, useParams } from "react-router-dom";
import { useLoadQuery } from "@store/admin/api/vendorApi.js";
import { AddressSelector } from "../features/map/components/AddressSelector.js";
import { useSelector } from "react-redux";
import { authState } from "@store/user/slices/authSlice.js";
import { useMeQuery } from "@store/user/api/userAuthApi.js";
import Header from "../features/header/Header.js";
import NavbarBottomPage from "../features/navbarBottom/pages/NavbarBottomPage";

export default function Layout() {
  const { res = "" } = useParams();
  const { isUser } = useSelector(authState);
  const { data, isLoading } = useLoadQuery(res, { skip: !res });
  const { data: user } = useMeQuery(isUser?.user_id ?? 0, { skip: !isUser?.user_id });

  return (
    <>
      <Header />
      <div className="venLayout">
        <Outlet context={{ data, isLoading, user }} />
      </div>
      <NavbarBottomPage data={data} user={user} />
      <AddressSelector />
    </>
  );
}
