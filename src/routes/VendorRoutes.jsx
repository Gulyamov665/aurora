import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ClientContainer from '../apps/client/pages/ClientContainer'
import ClientMainPage from '../apps/client/pages/ClientMainPage'
import OrdersPage from '../apps/client/modules/pages/OrdersPage'

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
