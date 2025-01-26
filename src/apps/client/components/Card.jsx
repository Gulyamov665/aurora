import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { addCartItem } from '../../../store/cartSlice'
import { useDispatch } from 'react-redux'

export default function Card(props) {
  const dispatch = useDispatch()

  const addToCart = (event) => {
    event.stopPropagation()
    const cartItem = {
      ...props,
      count: 1,
    }
    dispatch(addCartItem(cartItem))
  }

  return (
    <>
      <div className="card">
        <img
          className="card__image"
          loading="lazy"
          src={props.photo}
          alt={props.name}
        />
        <div className="card__info">
          <div className="car__info--title">
          <p className="card__info--price">
              <CurrencyFormat
                value={props.price}
                displayType={'text'}
                thousandSeparator={' '}
                suffix={' сум'}
              />
            </p>
            <h3>{props.name}</h3>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <button
            className="btn card-btn-order"
            // style={{ width: '90%', marginBottom: "10px" }}
            onClick={addToCart}
          >
            <b>+ Добавить</b>
          </button>
        </div>
      </div>
    </>
  )
}
