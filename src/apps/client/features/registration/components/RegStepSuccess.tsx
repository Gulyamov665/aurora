import { FC } from "react";
import styles from "../assets/Registration.module.scss";

export const RegStepSuccess: FC = () => {
  return (
    <div className="text-center">
      <h2>Вы успешно зарегистрировались</h2>
      <p className={styles["success-image"]}></p>
    </div>
  );
};
