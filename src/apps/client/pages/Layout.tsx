import { Outlet, useParams } from "react-router-dom";
import Header from "../features/header/Header.js";
import NavbarBottomPage from "../features/navbarBottom/pages/NavbarBottomPage";
import { useLoadQuery } from "@store/admin/api/vendorApi.js";

export default function Layout() {
  const { res = "" } = useParams();
  const { data, isLoading } = useLoadQuery(res);

  return (
    <>
      <Header />
      <div className="venLayout">
        <Outlet context={{ data, isLoading }} />
      </div>
      <NavbarBottomPage data={data} />
    </>
  );
}
