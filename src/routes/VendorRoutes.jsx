import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ClientMainPage from '../apps/client/pages/ClientMainPage'
import OrdersPage from '../apps/client/modules/order/pages/OrdersPage'
import Layout from '../apps/client/pages/Layout'

export default function VendorRoutes() {
  return (
    <Layout>
      <Routes>
        <Route index element={<ClientMainPage />} />
        <Route path="/cart" element={<OrdersPage />} />
      </Routes>
    </Layout>
  )
}
