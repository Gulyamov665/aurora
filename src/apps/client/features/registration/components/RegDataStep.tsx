import { Link } from "react-router-dom";
import { RegDataType } from "../types";
import { Controller } from "react-hook-form";
import { IMaskInput } from "react-imask";

import styles from "../assets/Registration.module.scss";

export default function RegForm({ register, handleSubmit, state, onSubmit, control, formState, trigger }: RegDataType) {
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
              value: /^\+998 \d{2} \d{3}-\d{2}-\d{2}$/,
              message: "Введите корректный номер телефона",
            },
          }}
          render={({ field, fieldState }) => (
            <>
              <IMaskInput
                {...field}
                mask="+998 00 000-00-00"
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
      <div className={styles["inputs-container"]}>
        <input type="password" id="password1" {...register("password_1")} placeholder="Пароль" />
      </div>
      <div className={styles["inputs-container"]}>
        <input type="password" id="password2" {...register("password_2")} placeholder="Повторите пароль" />
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
