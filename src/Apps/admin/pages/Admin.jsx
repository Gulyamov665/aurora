import React, { useState } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from '../static/Admin.module.scss'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import RedeemIcon from '@mui/icons-material/Redeem'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import Header from '../components/Header'

export default function Admin() {
  const navigate = useNavigate()
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('authTokens')
      ? JSON.parse(localStorage.getItem('authTokens'))
      : null
  )
  const [sidebarWidth, setSidebarWidth] = useState(
    JSON.parse(localStorage.getItem('sidebar')) ?? true
  )

  const qrCodeLocal = localStorage.getItem('qrCode')
    ? JSON.parse(localStorage.getItem('qrCode'))
    : null

  const handleExit = () => {
    localStorage.removeItem('authTokens')
    setAuthTokens(null)
    navigate('/')
  }

  const handleSidebar = () => {
    setSidebarWidth(!sidebarWidth)
    localStorage.setItem('sidebar', JSON.stringify(!sidebarWidth))
  }

  const buttonsInfo = [
    {
      text: 'Заведение',
      icon: <RestaurantMenuIcon color="white" sx={{ fontSize: 35 }} />,
      link: 'main',
    },
    {
      text: 'Меню',
      icon: <MenuBookIcon color="white" sx={{ fontSize: 35 }} />,
      link: 'menu',
    },
    {
      text: 'Акции',
      icon: <RedeemIcon sx={{ fontSize: 35 }} />,
      link: 'promo',
    },
    { text: 'Заказы', icon: <BorderColorIcon sx={{ fontSize: 35 }} /> },
  ]

  return (
    <>
      <Header sidebar={handleSidebar} />
      <div className={styles.parent}>
        {sidebarWidth && (
          <motion.div
            className={styles.section1}
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            exit={{
              x: -200,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className={`${styles.section_0} text-center`}>
              <img src={qrCodeLocal} className={styles.qrcode} />
            </div>
            <div className="d-flex flex-column ms-2">
              {buttonsInfo.map(({ text, icon, link }, index) => (
                <Link
                  key={index}
                  to={link}
                  onClick={handleSidebar}
                  className={`${styles.buttons} text-start btn`}
                >
                  {sidebarWidth ? (
                    <div className={styles.div}>
                      <span className="me-3">{icon}</span>
                      <span className="">{text}</span>
                    </div>
                  ) : (
                    <React.Fragment>{icon}</React.Fragment>
                  )}
                </Link>
              ))}
            </div>

            <div className={styles.arrow}>
              <button className="btn btn-danger" onClick={handleExit}>
                <strong>Выход</strong>
              </button>
            </div>
          </motion.div>
        )}

        <Outlet />
      </div>
    </>
  )
}
