import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useActions } from "@/hooks/useActions";
import { useSelector } from "react-redux";
import { modals } from "@store/appSlice";
import { LoadingScreen } from "@/apps/admin/features/loading/LoadingScreen";
import Header from "../../../components/Header";
import styles from "../assets/Admin.module.scss";
import Sidebar from "../components/Sidebar";

export default function Admin() {
  const sidebar = localStorage.getItem("sidebar");
  const { logout } = useActions();
  const [open, setOpen] = useState(sidebar ? JSON.parse(sidebar) : true);
  const { isLoading } = useSelector(modals);

  const handleSidebar = () => {
    setOpen(!open);
    localStorage.setItem("sidebar", JSON.stringify(!open));
  };

  return (
    <>
      <Header sidebar={handleSidebar} />
      <Sidebar open={open} logout={logout} handleSidebar={handleSidebar} />
      <div className={styles.parent}>
        {isLoading && <LoadingScreen loading={isLoading} />}
        {<Outlet />}
      </div>
    </>
  );
}
