import { useState } from "react";
import styles from "../styles/OrderButton.module.css";
import { NavigateFunction } from "react-router-dom";

type OrderButtonProps = {
  onClick: () => void;
  navigate: NavigateFunction;
};

export const OrderButton: React.FC<OrderButtonProps> = ({ onClick }) => {
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    onClick();
    if (!animate) {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
        // navigate("..");
      }, 8000);
    }
  };

  return (
    <button className={`${styles.order} ${animate ? styles.animate : ""}`} onClick={handleClick}>
      <span className={styles.default}>Оформить</span>
      <span className={styles.success}>
        Заказ оформлен
        <svg viewBox="0 0 12 10">
          <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
        </svg>
      </span>
      <div className={styles.box}></div>
      <div className={styles.truck}>
        <div className={styles.back}></div>
        <div className={styles.front}>
          <div className={styles.window}></div>
        </div>
        <div className={`${styles.light} ${styles.top}`}></div>
        <div className={`${styles.light} ${styles.bottom}`}></div>
      </div>
      <div className={styles.lines}></div>
    </button>
  );
};
