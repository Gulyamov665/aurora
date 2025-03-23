import { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useActions } from "@/hooks/useActions";
// import { useSelector } from "react-redux";
// import { modals } from "@store/appSlice";
import { LoadingScreen } from "@/apps/admin/features/loading/LoadingScreen";
import Header from "../../../components/Header";
import styles from "../assets/Admin.module.scss";
import Sidebar from "../components/Sidebar";
import { useLoadQuery } from "@store/admin/api/vendorApi";

export default function Admin() {
  const { res = "" } = useParams();
  const { data, isLoading } = useLoadQuery(res);
  const sidebar = localStorage.getItem("sidebar");
  const { logout } = useActions();
  const [open, setOpen] = useState(sidebar ? JSON.parse(sidebar) : true);
  // const { isLoading } = useSelector(modals);

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
