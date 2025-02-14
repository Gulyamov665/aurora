import styles from "../assets/AuthForm.module.scss";
import { Link } from "react-router-dom";
import { AuthData } from "../types";

export default function Login({ register, handleSubmit, submit, state }: AuthData) {
  return (
    <form className="text-center" onSubmit={handleSubmit(submit)}>
      <h1>Войти</h1>
      <div className="mt-3">
        <input type="text" id="login" {...register("login")} placeholder="Логин" />
      </div>
      <div className="mt-3">
        <input type="password" id="password" {...register("password")} placeholder="Пароль" />
      </div>
      <p>
        Нет аккаунта ?{" "}
        <Link to={`/register`} state={state}>
          <span>Регистрация</span>{" "}
        </Link>
      </p>
      <button type="submit" className={styles["form-button"]}>
        Войти
      </button>
    </form>
  );
}
