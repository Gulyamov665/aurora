import React, { useState } from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

function ClientContainer() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

export default ClientContainer
