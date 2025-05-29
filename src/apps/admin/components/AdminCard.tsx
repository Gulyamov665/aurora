import React from "react";
import styles from "./AdminCard.module.scss";
import IOSSwitch from "../../client/components/MuiSwitch";
import FormControlLabel from "@mui/material/FormControlLabel";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useNavigate } from "react-router-dom";
import { ProductType } from "@/apps/client/features/category/types";

export interface AdminCardProps {
  item: ProductType;
  isActive: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AdminCard: React.FC<AdminCardProps> = ({ item, isActive, onChange }) => {
  const navigate = useNavigate();

  const updateProduct = (id: number) => {
    navigate(`${id}`);
  };

  return (
    <div className={`${styles.col_1} mt-2`}>
      <div className={styles.title}>
        <h6>{item.name} </h6>
        <FormControlLabel label="" onClick={() => updateProduct(item.id)} control={<BorderColorIcon />} />
      </div>
      <div className={styles.iosBtn}>
        <FormControlLabel label="Активность" control={<IOSSwitch checked={isActive} onChange={onChange} />} />
      </div>
    </div>
  );
};
