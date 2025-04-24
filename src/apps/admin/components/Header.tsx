import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { authState } from "@store/user/slices/authSlice";
import styles from "./Header.module.scss";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../../assets/transparent_logo.png";
import VisibilityIcon from "@mui/icons-material/Visibility";

type HeaderProps = {
  sidebar: () => void;
};

export const Header: React.FC<HeaderProps> = ({ sidebar }) => {
  const { isUser } = useSelector(authState);

  return (
    <header className={`${styles.header} sticky-top`}>
      <div>
        <MenuIcon
          sx={{
            color: "white",
          }}
          fontSize="large"
          onClick={sidebar}
        />
        <img src={logo} className={styles.logo} alt="img" />
      </div>
      <div className="d-flex justify-content-between">
        <Link to={`/vendor/${isUser?.vendor}`}>
          <button className={`btn btn-info ${styles.btn_size}`}>
            <span style={{ color: "white" }}>
              <VisibilityIcon />
            </span>
          </button>
        </Link>
      </div>
    </header>
  );
};
