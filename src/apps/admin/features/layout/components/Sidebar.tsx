import { Link } from "react-router-dom";
import { buttonsInfo } from "./ButtonsList";
import { motion } from "framer-motion";
import styles from "../assets/Admin.module.scss";
import { FC } from "react";
import { SideBarProps } from "../types";

const Sidebar: FC<SideBarProps> = ({ handleSidebar, logout, sidebarWidth }) => {
  return (
    <motion.div
      className={styles.section1}
      initial={{ x: -200 }}
      animate={{ x: 0 }}
      exit={{
        x: -200,
        opacity: 0,
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
  );
};

export default Sidebar;
