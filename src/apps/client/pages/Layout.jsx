import React from 'react'
import Header from '../components/Header'

import NavbarBottomPage from '../modules/navbarBottom/pages/NavbarBottomPage'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <Header />
      <div className="venLayout">
        <Outlet />
      </div>
      <NavbarBottomPage />
    </>
  )
}
