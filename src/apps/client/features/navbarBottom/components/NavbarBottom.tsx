import { Link } from "react-router-dom";
import { NavbarBottomProps } from "../interfaces/interface";
import styles from "../assets/NavbarBottom.module.css";

export default function NavbarBottom({ items, isUser, current, visible }: NavbarBottomProps) {
  return (
    <div className={`${styles["navbar"]} ${visible ? styles["show"] : styles["hide"]}`}>
      <div className="container">
        <div className={styles["icons-list"]}>
          <p className={`${styles["list-links"]} ${styles["counter"]}`}>{isUser && items?.products?.length}</p>

          <Link
            to={current == "cart" ? "confirm" : "cart"}
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
}
