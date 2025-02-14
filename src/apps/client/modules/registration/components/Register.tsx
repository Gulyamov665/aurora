import styles from "../../auth/assets/AuthForm.module.scss";
import { Link } from "react-router-dom";
import { RegisterType } from "../types";

export default function Register({ register, handleSubmit, state, onSubmit }: RegisterType) {
  return (
    <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
      <h1>Регистрация</h1>
      <div className="mt-3">
        <input type="text" id="name" {...register("name")} placeholder="Имя" />
      </div>
      <div className="mt-3">
        <input type="text" id="last_name" {...register("last_name")} placeholder="Фамилия" />
      </div>
      <div className="mt-3">
        <input type="text" className="" id="phone_number" {...register("phone_number")} placeholder="Номер телефона" />
      </div>

      <p>
        Уже есть аккаунт ?{" "}
        <Link to="/login" state={state}>
          <span>Войти</span>
        </Link>
      </p>

      <button type="submit" className={styles["form-button"]}>
        Продолжить
      </button>
    </form>
  );
}
