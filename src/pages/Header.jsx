import React, { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import styles from './Header.module.scss'
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom'
import { useQrCodeMutation } from '@store/admin/qrCode'
import { useGetQrCodeQuery } from '../store/admin/qrCode'
import { DownloadQr } from '../Utils/downloadQr'

export default function Header({ sidebar }) {
  const [authTokens] = useState(() =>
    localStorage.getItem('authTokens')
      ? JSON.parse(localStorage.getItem('authTokens'))
      : null
  )
  const [qrCode, { data }] = useQrCodeMutation()
  // const { data: getQrCode } = useGetQrCodeQuery()
  const [vendor, setVendor] = useState()

  // console.log(data)
  const qrCodeGenerate = async () => {
    await qrCode()
    DownloadQr(data)
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
      <div className="btn-group">
        <button className="btn btn-danger" onClick={qrCodeGenerate}>
          QrCode
        </button>
        <Link to={`/vendor/${vendor}`}>
          <button className="btn btn-info">
            <span style={{ color: 'white' }}>Предпросмотр</span>
          </button>
        </Link>
      </div>
    </header>
  )
}
