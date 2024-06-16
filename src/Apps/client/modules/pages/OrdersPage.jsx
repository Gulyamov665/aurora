import React from 'react'

import OrderedProducts from '../components/OrderedProducts'
import ConfirmOrder from '../components/ConfirmOrder'

function OrdersPage() {
  return (
    <div className="container">
      <OrderedProducts />
      <ConfirmOrder />
    </div>
  )
}

export default OrdersPage
