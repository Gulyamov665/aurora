import React from "react";
import styles from "../assets/AdminPromo.module.scss";
import FormControlLabel from "@mui/material/FormControlLabel";
import EditNoteIcon from "@mui/icons-material/EditNote";
import IOSSwitch from "../../../../client/components/MuiSwitch";
import { Link } from "react-router-dom";
import PromotionsPage from "./PromoList";

function Promos({ data, updatePromo }) {
  return (
    <>
      {data?.map((item) => (
        <div key={item.id} className={`${styles.card_promo}`}>
          <div className={styles.img}>
            <img src={item.photo} alt="" />
          </div>
          <div className={styles.name}>{item.name}</div>
          <div className={styles.name_active}>
            <FormControlLabel
              control={<IOSSwitch checked={item.is_active} onChange={() => updatePromo({ ...item })} />}
              label="Активность"
            />
            <Link to={`${item.id}`} style={{ textDecoration: "none", color: "black" }}>
              <div>
                <EditNoteIcon />
              </div>
            </Link>
          </div>
          <div className={styles.switch}></div>
        </div>
      ))}
    </>
  );
}

export default Promos;
