import { Link } from "react-router-dom";
import { RegDataType } from "../types";
import styles from "../../auth/assets/AuthForm.module.scss";

export default function RegForm({ register, handleSubmit, state, onSubmit }: RegDataType) {
  return (
    <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
      <h1>Регистрация</h1>
      <div className="mt-3">
        <input type="text" id="username" {...register("username")} placeholder="Имя" />
      </div>
      <div className="mt-3">
        <input type="email" id="email" {...register("email")} placeholder="Email" />
      </div>
      <div className="mt-3">
        <input type="text" id="phone_number" {...register("phone")} placeholder="Номер телефона" />
      </div>
      <div className="mt-3">
        <input type="password" id="password1" {...register("password_1")} placeholder="Пароль" />
      </div>
      <div className="mt-3">
        <input type="password" id="password2" {...register("password_2")} placeholder="Повторите пароль" />
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
