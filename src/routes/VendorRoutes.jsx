import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ClientContainer from '../Apps/client/pages/ClientContainer'
import ClientMainPage from '../Apps/client/pages/ClientMainPage'
import OrdersPage from '../Apps/client/modules/pages/OrdersPage'

export default function VendorRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ClientContainer />}>
        <Route index element={<ClientMainPage />} />
        <Route path="orders/" element={<OrdersPage />} />
      </Route>
    </Routes>
  )
}
