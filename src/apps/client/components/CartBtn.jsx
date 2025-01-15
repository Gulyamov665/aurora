import React from 'react'
import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux'
import CurrencyFormat from 'react-currency-format'

function CartBtn() {
  const { items, totalPrice } = useSelector((state) => state.cart)

  const id = document.getElementById('cartBtn')
  return (
    items.length > 0 &&
    createPortal(
      <div
        style={{
          width: '90%',
          height: 70,
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          background: '#34495e',
          transform: 'translateX(-50%)',
          borderRadius: 20,
          padding: 20,
          zIndex: 10000,
          margin: 'auto',
          cursor: 'pointer',
        }}
        className=" d-flex justify-content-between align-items-center"
      >
        <b style={{ color: 'wheat' }}>Корзина</b>
        <b style={{ color: 'wheat' }}>
          <CurrencyFormat
            value={totalPrice}
            displayType={'text'}
            thousandSeparator={' '}
            suffix={' Сум'}
          />
        </b>
      </div>,
      id
    )
  )
}

export default CartBtn


