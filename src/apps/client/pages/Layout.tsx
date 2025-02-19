import Header from "../components/Header.jsx";
import { Outlet, useLocation } from "react-router-dom";
import NavbarBottomPage from "../features/navbarBottom/pages/NavbarBottomPage";
import { AnimatePresence } from "framer-motion";
import MotionWrapper from "./MotionWrapper.js";

export default function Layout() {
  const location = useLocation();
  return (
    <>
      <AnimatePresence mode="popLayout">
        <MotionWrapper key={location.pathname}>
          <Header />
          <div className="venLayout">
            <Outlet />
          </div>
          <NavbarBottomPage />
        </MotionWrapper>
      </AnimatePresence>
    </>
  );
}
