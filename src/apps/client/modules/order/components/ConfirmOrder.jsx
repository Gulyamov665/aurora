import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSendMessageMutation } from '../../../../../store/user/api/dispatcherApi'
import { useLoadQuery } from '../../../../../store/admin/vendorApi'
import { removeCartItems } from '../../../../../store/cartSlice'

function ConfirmOrder() {
  const { table, res } = useParams()
  const { items, totalPrice } = useSelector((state) => state.cart)
  const { data = [] } = useLoadQuery(res)
  const [dispatcher, { isLoading }] = useSendMessageMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleOrders = async () => {
    if (data.orders_chat_id) {
      const order = {
        items,
        totalPrice,
        table,
        chat_id: data.orders_chat_id,
        availability: data.availability_orders,
      }
      await dispatcher(order)
      dispatch(removeCartItems())
      navigate(-1)
      toast.success('Заказ отправлен')
      return
    }
  }

  return (
    <div>
      <div
        className="d-flex justify-content-between align-items-center"
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
          color: 'wheat',
        }}
      >
        <div>
          <CurrencyFormat
            value={totalPrice}
            displayType={'text'}
            thousandSeparator={' '}
            suffix={' Сум'}
          />{' '}
        </div>
        <div>
          {isLoading ? (
            <button className={'btn btn-warning'}>
              <span
                className="spinner-border spinner-border-sm"
                aria-hidden="true"
              ></span>
            </button>
          ) : (
            <button className={'btn btn-warning'} onClick={handleOrders}>
              Заказать
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ConfirmOrder
