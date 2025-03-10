import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { motion } from "framer-motion";
// import { useGetOrdersQuery } from "@store/admin/api/express";
import { buttonsInfo } from "../components/ButtonsList";
import { useActions } from "@/hooks/useActions";
import Header from "../../../components/Header";
import styles from "../assets/Admin.module.scss";

export default function Admin() {
  const sidebar = localStorage.getItem("sidebar");
  const [sidebarWidth, setSidebarWidth] = useState(sidebar ? JSON.parse(sidebar) : true);
  const { logout } = useActions();
  // const { data } = useGetOrdersQuery({});

  const handleSidebar = () => {
    setSidebarWidth(!sidebarWidth);
    localStorage.setItem("sidebar", JSON.stringify(!sidebarWidth));
  };

  return (
    <>
      <Header sidebar={handleSidebar} />
      <div className={styles.parent}>
        {sidebarWidth && (
          <motion.div
            className={styles.section1}
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            exit={{
              x: -200,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className={`${styles.section_0} text-center`}></div>
            <div className="d-flex flex-column ms-2">
              {buttonsInfo.map(({ text, icon, link }, index) => (
                <Link key={index} to={link} onClick={handleSidebar} className={`${styles.buttons} text-start btn`}>
                  {sidebarWidth ? (
                    <div className={styles.div}>
                      <span className="me-3">{icon}</span>
                      <span className="">{text}</span>
                    </div>
                  ) : (
                    <>{icon}</>
                  )}
                </Link>
              ))}
            </div>

            <div className={styles.arrow}>
              <button className="btn btn-danger" onClick={() => logout()}>
                <strong>Выход</strong>
              </button>
            </div>
          </motion.div>
        )}

        <Outlet />
      </div>
    </>
  );
}
