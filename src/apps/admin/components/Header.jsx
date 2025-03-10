import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { useQrCodeMutation } from "../../../store/admin/api/qrCode";
import { DownloadQr } from "../../../Utils/downloadQr";
import { useSelector } from "react-redux";
import { authState } from "@store/user/slices/authSlice";
import styles from "./Header.module.scss";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../../assets/transparent_logo.png";

export default function Header({ sidebar }) {
  const { isUser } = useSelector(authState);
  const [qrCode, { isLoading }] = useQrCodeMutation();

  const qrCodeGenerate = async () => {
    await qrCode({ quantity: 1 });
    await DownloadQr(authTokens?.access);
  };

  return (
    <header className={`${styles.header} sticky-top`}>
      <div>
        <MenuIcon
          sx={{
            color: "white",
          }}
          fontSize="large"
          onClick={sidebar}
        />
        <img src={logo} className={styles.logo} alt="img" />
      </div>
      <div className="d-flex justify-content-between">
        {!isLoading ? (
          <button className={`btn btn-danger ${styles.btn_size} me-2`} onClick={qrCodeGenerate}>
            QrCode
          </button>
        ) : (
          <button className={`btn btn-danger ${styles.btn_size}`} onClick={qrCodeGenerate}>
            <span className="spinner-border spinner-border-sm " aria-hidden="true"></span>
          </button>
        )}

        <Link to={`/vendor/${isUser?.vendor}`}>
          <button className={`btn btn-info ${styles.btn_size}`}>
            <span style={{ color: "white" }}>Предпросмотр</span>
          </button>
        </Link>
      </div>
    </header>
  );
}
