import styles from "../assets/AuthForm.module.scss";
import { Link } from "react-router-dom";
import { AuthData } from "../types";

export default function Login({ register, handleSubmit, submit, state, isLoading, error, formState }: AuthData) {
  return (
    <form className="text-center" onSubmit={handleSubmit(submit)}>
      <h1>Войти</h1>
      <div className="mt-3">
        <input
          type="tel"
          id="phone"
          {...register("phone", { required: "Это поле обязательно для заполнения" })}
          placeholder="Номер телефона"
        />
        <div className={`${styles["error-message"]} ${formState.errors.phone ? styles["show"] : ""}`}>
          {formState.errors.phone && formState.errors.phone.message}
        </div>
      </div>
      <div className="mt-3">
        <input
          type="password"
          id="password"
          {...register("password", { required: "Это поле обязательно для заполнения" })}
          placeholder="Пароль"
        />
        <div className={`${styles["error-message"]} ${formState.errors.password ? styles["show"] : ""}`}>
          {formState.errors.password && formState.errors.password.message}
        </div>
      </div>
      <p>
        Нет аккаунта ?{" "}
        <Link to={`/register`} state={state}>
          <span>Регистрация</span>{" "}
        </Link>
      </p>
      <p className={`${styles["error-message"]} ${error?.message ? styles["show"] : ""}`}>{error && error.message}</p>
      <button
        type="submit"
        className={`${styles["form-button"]} ${isLoading || !formState.isValid ? " disabled" : ""}`}
      >
        {!isLoading ? (
          <p>Войти</p>
        ) : (
          <span className={`spinner-border spinner-border-sm ${styles["btn-span-spinner"]}`} aria-hidden="true"></span>
        )}
      </button>
    </form>
  );
}
