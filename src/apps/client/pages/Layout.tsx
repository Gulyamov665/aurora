import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import NavbarBottomPage from "../features/navbarBottom/pages/NavbarBottomPage";

export default function Layout() {
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
