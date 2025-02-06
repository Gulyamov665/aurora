import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ClientMainPage from '../apps/client/pages/ClientMainPage'
import OrdersPage from '../apps/client/modules/order/pages/OrdersPage'
import Layout from '../apps/client/pages/Layout'

export default function VendorRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ClientMainPage />} />
        <Route path="cart" element={<OrdersPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="profile" element={<OrdersPage />} />
      </Route>
    </Routes>
  )
}
