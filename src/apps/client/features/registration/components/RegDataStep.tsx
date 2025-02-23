import { Link } from "react-router-dom";
import { RegDataType } from "../types";
import { Controller } from "react-hook-form";
import { IMaskInput } from "react-imask";
// import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import styles from "../assets/Registration.module.scss";
import { useState } from "react";

export default function RegForm({ register, handleSubmit, state, onSubmit, control, formState, trigger }: RegDataType) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
      <h1>Регистрация</h1>
      <div className={styles["inputs-container"]}>
        <input
          type="text"
          id="username"
          {...register("username", {
            required: "Это поле обязательно для заполнения",
            onBlur: () => trigger("username"),
          })}
          placeholder="Имя"
        />
        {
          <div className={`${styles["error-message"]} ${formState.errors.username ? styles["show"] : ""}`}>
            {formState.errors.username && formState.errors.username.message}
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
      <div
        className={`${styles["inputs-container"]} ${styles["password"]} ${showPassword ? styles["show-password"] : ""}`}
        onClick={() => setShowPassword(!showPassword)}
      >
        <input
          type={showPassword ? "text" : "password"}
          id="password1"
          {...register("password_1", { required: "Это поле обязательно для заполнения" })}
          placeholder="Пароль"
        />
      </div>
      <div className={styles["inputs-container"]}>
        <input
          type="password"
          id="password2"
          {...register("password_2", { required: "Это поле обязательно для заполнения" })}
          placeholder="Повторите пароль"
        />
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
