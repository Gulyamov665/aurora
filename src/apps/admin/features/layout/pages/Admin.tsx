import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useActions } from "@/hooks/useActions";
import Header from "../../../components/Header";
import styles from "../assets/Admin.module.scss";
import Sidebar from "../components/Sidebar";

export default function Admin() {
  const sidebar = localStorage.getItem("sidebar");
  const [sidebarWidth, setSidebarWidth] = useState(sidebar ? JSON.parse(sidebar) : true);
  const { logout } = useActions();

  const handleSidebar = () => {
    setSidebarWidth(!sidebarWidth);
    localStorage.setItem("sidebar", JSON.stringify(!sidebarWidth));
  };

  return (
    <>
      <Header sidebar={handleSidebar} />
      {sidebarWidth && <Sidebar handleSidebar={handleSidebar} logout={logout} sidebarWidth={sidebarWidth} />}
      <div className={styles.parent}>
        <Outlet />
      </div>
    </>
  );
}
