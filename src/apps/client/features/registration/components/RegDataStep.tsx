import { Link } from "react-router-dom";
import { RegDataType } from "../types";
import { Controller } from "react-hook-form";
import { IMaskInput } from "react-imask";
import styles from "../assets/Registration.module.scss";
import { useState } from "react";

export default function RegForm({
  register,
  handleSubmit,
  state,
  onSubmit,
  control,
  formState,
  trigger,
  watch,
  error,
}: RegDataType) {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const password = watch("password_1");

  return (
    <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
      <h1>Регистрация</h1>
      <div className={styles["inputs-container"]}>
        <input
          type="text"
          id="first_name"
          {...register("first_name", {
            required: "Это поле обязательно для заполнения",
          })}
          placeholder="Имя"
        />
        {
          <div className={`${styles["error-message"]} ${formState.errors.first_name ? styles["show"] : ""}`}>
            {formState.errors.first_name && formState.errors.first_name.message}
          </div>
        }
      </div>
      <div className={styles["inputs-container"]}>
        <input
          type="text"
          id="last_name"
          {...register("last_name", {
            required: "Это поле обязательно для заполнения",
          })}
          placeholder="Фамилия"
        />
        {
          <div className={`${styles["error-message"]} ${formState.errors.last_name ? styles["show"] : ""}`}>
            {formState.errors.last_name && formState.errors.last_name.message}
          </div>
        }
      </div>
      <div className={styles["inputs-container"]}>
        <input
          type="email"
          id="email"
          {...register("email", { required: "Это поле обязательно для заполнения" })}
          placeholder="Email"
        />
      </div>
      <div className={styles["inputs-container"]}>
        <Controller
          name="phone"
          control={control}
          defaultValue=""
          rules={{
            required: "Это поле обязательно для заполнения",
            pattern: {
              value: /^\+998\d{2}\d{3}\d{2}\d{2}$/,
              message: "Введите корректный номер телефона",
            },
          }}
          render={({ field, fieldState }) => (
            <>
              <IMaskInput
                {...field}
                mask="+998000000000"
                placeholder="Номер телефона"
                onAccept={(value) => field.onChange(value)}
                onBlur={() => trigger("phone")}
              />

              <div className={`${styles["error-message"]} ${formState.errors.phone ? styles["show"] : ""}`}>
                {fieldState.error && fieldState.error.message}
              </div>
            </>
          )}
        />
      </div>

      <div className={`${styles["inputs-container"]} ${styles["password"]}`}>
        <input
          type={showPassword ? "text" : "password"}
          id="password1"
          {...register("password_1", { required: "Это поле обязательно для заполнения" })}
          placeholder="Пароль"
        />
        <span
          className={`${showPassword ? styles["show-pass"] : styles["hide"]}`}
          onClick={() => setShowPassword(!showPassword)}
        ></span>
      </div>

      <div className={`${styles["inputs-container"]} ${styles["password"]}`}>
        <input
          type={showPassword2 ? "text" : "password"}
          id="password2"
          {...register("password_2", {
            required: "Это поле обязательно для заполнения",
            validate: (value) => value === password || "Пароли не совпадают",
          })}
          placeholder="Повторите пароль"
        />
        <span
          className={`${showPassword2 ? styles["show-pass"] : styles["hide"]}`}
          onClick={() => setShowPassword2(!showPassword2)}
        ></span>
      </div>

      <div className={`${styles["error-message"]} ${formState.errors.password_2 ? styles["show"] : ""}`}>
        {formState.errors.password_2 && formState.errors.password_2.message}
      </div>

      <div className={`${styles["error-message"]} ${error.message ? styles["show"] : ""}`}>
        <p>{error && error.message}</p>
      </div>

      <p>
        Уже есть аккаунт ?{" "}
        <Link to="/login" state={state}>
          <span>Войти</span>
        </Link>
      </p>

      <button type="submit" className={`${styles["form-button"]} ${!formState.isValid ? "disabled" : ""} `}>
        Продолжить
      </button>
    </form>
  );
}
