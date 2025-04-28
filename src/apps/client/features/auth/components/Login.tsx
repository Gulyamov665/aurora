import styles from "../assets/AuthForm.module.scss";
import { Link } from "react-router-dom";
import { AuthData } from "../types";
import { Controller } from "react-hook-form";
import { IMaskInput } from "react-imask";

export default function Login({
  register,
  handleSubmit,
  submit,
  state,
  isLoading,
  error,
  formState,
  control,
  trigger,
}: AuthData) {
  return (
    <form className="text-center" onSubmit={handleSubmit(submit)}>
      <h1>Войти</h1>
      <div className="mt-3">
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
            minLength: {
              value: 12,
              message: "Номер телефона должен быть минимум 12 символов",
            },
          }}
          render={({ field, fieldState }) => (
            <>
              <IMaskInput
                {...field}
                mask="+000000000000"
                type="tel"
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
