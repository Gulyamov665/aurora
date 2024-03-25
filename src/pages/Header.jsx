import React, { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import styles from './Header.module.scss'
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom'
import { useQrCodeMutation } from '@store/admin/qrCode'
import { DownloadQr } from '../Utils/downloadQr'

export default function Header({ sidebar }) {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('authTokens')
      ? JSON.parse(localStorage.getItem('authTokens'))
      : null
  )
  const [qrCode, { isLoading }] = useQrCodeMutation()
  const [vendor, setVendor] = useState()

  const qrCodeGenerate = async () => {
    await qrCode()
    DownloadQr(authTokens?.access)
  }

  useEffect(() => {
    if (authTokens) {
      setVendor(jwtDecode(authTokens.access).vendor)
    } else {
      setVendor('')
    }
  }, [authTokens])

  return (
    <header className={styles.header}>
      <div>
        <MenuIcon
          sx={{
            color: 'white',
          }}
          fontSize="large"
          onClick={sidebar}
        />
        <img
          src="/img/transparent_logo.png"
          className={styles.logo}
          alt="img"
        />
      </div>
      <div className="d-flex justify-content-between">
        {!isLoading ? (
          <button
            className={`btn btn-danger ${styles.btn_size} me-2`}
            onClick={qrCodeGenerate}
          >
            QrCode
          </button>
        ) : (
          <button
            className={`btn btn-danger ${styles.btn_size}`}
            onClick={qrCodeGenerate}
          >
            <span
              class="spinner-border spinner-border-sm "
              aria-hidden="true"
            ></span>
          </button>
        )}

        <Link to={`/vendor/${vendor}`}>
          <button className={`btn btn-info ${styles.btn_size}`}>
            <span style={{ color: 'white' }}>Предпросмотр</span>
          </button>
        </Link>
      </div>
    </header>
  )
}
