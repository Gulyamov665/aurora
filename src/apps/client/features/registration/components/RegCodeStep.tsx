import { FC } from "react";
import styles from "../../auth/assets/AuthForm.module.scss";
import { RequestType } from "../types";

const RegCodeStep: FC<RequestType> = ({ register, handleSubmit, codeRequestSubmit, botLink }) => {
  return (
    <form className="text-center" onSubmit={handleSubmit(codeRequestSubmit)}>
      <h5>Подтвердите код отправленный вам телеграм ботом</h5>
      <div>
        <input type="text" id="code" {...register("code")} />
      </div>
      <a href={botLink}>Перейти по ссылки в телеграм</a>
      <button type="submit" className={styles["form-button"]}>
        Отправить
      </button>
    </form>
  );
};

export default RegCodeStep;
