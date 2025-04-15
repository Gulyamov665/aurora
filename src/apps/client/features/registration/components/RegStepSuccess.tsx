import { FC } from "react";
import styles from "../assets/Registration.module.scss";
import img from "@/assets/Success-Transparent-Background.png";
import { Link } from "react-router-dom";

export const RegStepSuccess: FC = () => {
  return (
    <div className="text-center">
      <h2>Вы успешно зарегистрировались</h2>
      <div className={styles["success-image"]}>
        <img src={img} alt="" />
      </div>
      <button type="submit" className={`${styles["form-button"]} }`}>
        <Link className="link-reset" to={"/login"}>
          Войти
        </Link>
      </button>
    </div>
  );
};
