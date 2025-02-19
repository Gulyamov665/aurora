import Header from "../features/header/Header.js";
import { Outlet } from "react-router-dom";
import NavbarBottomPage from "../features/navbarBottom/pages/NavbarBottomPage";

export default function Layout() {
  // const location = useLocation();
  return (
    <>
      <Header />
      <div className="venLayout">
        <Outlet />
      </div>
      <NavbarBottomPage />
    </>
  );
}
