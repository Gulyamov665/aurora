import styles from "../assets/NavbarBottom.module.css";
import { Link } from "react-router-dom";
import { NavbarBottomProps } from "../interfaces/interface";
import { Badge } from "@mui/material";

export default function NavbarBottom({ icons }: NavbarBottomProps) {
  const settings = {
    anchorOrigin: {
      vertical: "top" as "top",
      horizontal: "right" as "right",
    },
  };
  return (
    <div className={styles["navbar"]}>
      <div className="container">
        <div className={styles["icons-list"]}>
          {icons
            .filter((item) => item.active)
            .map((item) => (
              <Link to={item.link} className={styles["list-links"]} key={item.title}>
                <div key={item.title}>
                  <Badge {...settings} color="error" badgeContent={item.counter}>
                    {item.icon}
                  </Badge>
                  <p>{item.title}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
