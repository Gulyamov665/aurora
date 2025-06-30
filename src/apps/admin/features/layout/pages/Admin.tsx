import { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useActions } from "@/hooks/useActions";
import { LoadingScreen } from "@/apps/admin/features/loading/LoadingScreen";
import { Header } from "../../../components/Header.tsx";
import styles from "../assets/Admin.module.scss";
import Sidebar from "./Sidebar.tsx";
import { useLoadQuery } from "@store/admin/api/vendorApi";

export default function Admin() {
  const { res = "" } = useParams();
  const { data, isLoading } = useLoadQuery(res);
  const sidebar = localStorage.getItem("sidebar");
  const { logout } = useActions();
  const [open, setOpen] = useState(sidebar ? JSON.parse(sidebar) : true);

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
        {<Outlet context={{ data, res }} />}
      </div>
    </>
  );
}
