import { useNavigate } from "react-router-dom";
import styles from "../../auth/assets/AuthForm.module.scss";
import Register from "../components/Register";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { RegistrationPageType } from "../types";
import { FC } from "react";
import { authState } from "@store/user/slices/authSlice";
import { useSelector } from "react-redux";
import { useCodeRequestMutation, useRegistrationMutation } from "@store/user/api/userRegistrationApi";

const RegistrationPage: FC<RegistrationPageType> = ({ state }) => {
  const navigate = useNavigate();
  const { regStep, userId, botLink, error } = useSelector(authState);
  const [registration] = useRegistrationMutation();
  const [codeRequest] = useCodeRequestMutation();

  return (
    <div className="container center mt-5">
      <ArrowBackIcon
        onClick={() => navigate(state.from)}
        sx={{ fontSize: "30px", cursor: "pointer", marginBottom: "20px" }}
      />
      <div className={`${styles["form-box"]} card`}>
        <Register
          state={state}
          regStep={regStep}
          userId={userId}
          botLink={botLink}
          error={error}
          registration={registration}
          codeRequest={codeRequest}
        />
      </div>
    </div>
  );
};

export default RegistrationPage;
