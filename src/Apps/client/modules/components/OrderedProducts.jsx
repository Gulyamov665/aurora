import React from 'react'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import CurrencyFormat from 'react-currency-format'
import {
  addCartItem,
  minusItem,
  removeCartItems,
} from '../../../../store/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function OrderedProducts() {
  const { items } = useSelector((state) => state.cart)
  const navigate = useNavigate()

  console.log(items)
  const dispatch = useDispatch()

  const removeItems = () => {
    if (confirm('Удалить все товари из корзины ?')) dispatch(removeCartItems())
  }

  return (
    <div>
      <div style={{ marginBottom: 90 }}>
        <div className="d-flex justify-content-between">
          <div className="mx-3" onClick={() => navigate(-1)}>
            <ArrowBackIcon sx={{ fontSize: '30px' }} />
          </div>
          <div onClick={removeItems} style={{ cursor: 'pointer' }}>
            <DeleteIcon />
          </div>
        </div>

        {items.map((item) => (
          <div
            className="d-flex justify-content-between align-items-center "
            style={{
              borderRadius: '20px',
              width: '100%',
              padding: '10px',
              margin: '5px 0',
              backgroundColor: '#F8FBFF',
            }}
            key={item.id}
          >
            <div className="d-flex align-items-center">
              <img
                src={item.photo}
                alt=""
                width={100}
                height={100}
                style={{ borderRadius: '20px', objectFit: 'cover' }}
              />
              <div className="mx-2">
                <b>{item.name}</b>
                <p>
                  <CurrencyFormat
                    value={item.price * item.count}
                    displayType={'text'}
                    thousandSeparator={' '}
                    suffix={' Сум'}
                  />
                </p>
              </div>
            </div>
            <div className="btn-group bg-white ordersPageBtn">
              <button
                className={'btn text-danger '}
                onClick={() => dispatch(minusItem(item.id))}
              >
                <RemoveIcon sx={{ fontSize: 20, color: 'black' }} />
              </button>

              <button className="btn text-black">{item.count}</button>
              <button
                className="btn text-success"
                onClick={() => dispatch(addCartItem(item))}
              >
                <AddIcon sx={{ fontSize: 20, color: 'black' }} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrderedProducts
