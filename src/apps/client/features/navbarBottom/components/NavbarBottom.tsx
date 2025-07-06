import { Link } from "react-router-dom";
import { NavbarBottomProps } from "../interfaces/interface";
import styles from "../assets/NavbarBottom.module.css";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";

export const NavbarBottom = (props: NavbarBottomProps) => {
  const { items, isUser, current, visible, user, itemsQuantity, deliveryPrice } = props;
  return (
    <div className={`${styles["navbar"]} ${visible ? styles["show"] : styles["hide"]}`}>
      <div className="container">
        <div style={{ padding: 0, display: "flex", justifyContent: "space-between", height: 25 }}>
          <div style={{ width: "30%", textAlign: "start" }}>
            <LocalTaxiIcon fontSize="small" style={{ marginLeft: 14 }} />
          </div>

          <div style={{ width: "30%", fontSize: 13 }}>
            <b>{deliveryPrice?.toLocaleString()} сум</b>
          </div>
          <div style={{ width: "30%", textAlign: "end", fontSize: 13 }}>
            <p>30-40 м</p>
          </div>
        </div>
        <div className={styles["icons-list"]}>
          <p className={`${styles["list-links"]} ${styles["counter"]}`}>{isUser && itemsQuantity()}</p>

          <Link
            to={current == "cart" && !user?.location ? "maps" : current == "cart" ? "confirm" : "cart"}
            state={{ from: location.pathname }}
            className={`${styles["list-links"]} ${styles["next"]}`}
          >
            <p>Далее</p>
          </Link>
          <p className={`${styles["list-links"]} ${styles["total"]}`}>{items?.totalPrice?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};
