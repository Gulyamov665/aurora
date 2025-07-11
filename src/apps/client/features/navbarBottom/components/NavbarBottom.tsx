import { Link } from "react-router-dom";
import { NavbarBottomProps } from "../interfaces/interface";
import styles from "../assets/NavbarBottom.module.css";
import { CircularProgress } from "@mui/material";
// import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";

export const NavbarBottom = (props: NavbarBottomProps) => {
  const { items, isUser, current, visible, user, itemsQuantity, deliveryPrice, isLoading } = props;

  return (
    <div className={`${styles["navbar"]} ${visible ? styles["show"] : styles["hide"]}`}>
      <div className="container">
        <div style={{ padding: 0, display: "flex", justifyContent: "center", height: 25 }}>
          {/* <div style={{ width: "10%", textAlign: "start" }}> */}
          {/* <LocalTaxiIcon fontSize="small" style={{ marginLeft: 14 }} /> */}
          {/* </div> */}

          <div style={{ width: "70%", fontSize: 13 }}>
            <b>Доставка {deliveryPrice ? `${deliveryPrice.toLocaleString()} сум` : "бесплатная"}</b>
          </div>
          {/* <div style={{ width: "10%", textAlign: "end", fontSize: 13 }}> */}
          {/* <p>30-40 м</p> */}
          {/* </div> */}
        </div>
        <div className={styles["icons-list"]}>
          <p className={`${styles["list-links"]} ${styles["counter"]}`}>{isUser && itemsQuantity()}</p>

          <Link
            to={current == "cart" && !user?.location ? "maps" : current == "cart" ? "confirm" : "cart"}
            state={{ from: location.pathname }}
            className={`${styles["list-links"]} ${styles["next"]}`}
          >
            {isLoading ? <CircularProgress size={18} sx={{ color: "#ffffff" }} /> : <p>Далее</p>}
          </Link>
          <p className={`${styles["list-links"]} ${styles["total"]}`}>{items?.totalPrice?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};
