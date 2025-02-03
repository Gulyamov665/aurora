import React from 'react'

import OrdersList from '../components/OrdersList'
import ConfirmOrder from '../components/ConfirmOrder'

function OrdersPage() {
  return (
    <div className="container">
      <OrdersList />
      {/* <ConfirmOrder /> */}
    </div>
  )
}

export default OrdersPage
