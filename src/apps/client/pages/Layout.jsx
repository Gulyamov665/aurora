import React from 'react'
import Header from '../components/Header'

import NavbarBottomPage from '../modules/navbarBottom/pages/NavbarBottomPage'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="venLayout">{children}</div>
      <NavbarBottomPage />
    </>
  )
}
