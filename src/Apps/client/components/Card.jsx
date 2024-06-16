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
            <h3>{props.name}</h3>
            <p className="card__info--price">
              <CurrencyFormat
                value={props.price}
                displayType={'text'}
                thousandSeparator={' '}
                suffix={' Сум'}
              />
            </p>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <button
            className="btn btn-warning mb-2"
            style={{ width: '95%' }}
            onClick={addToCart}
          >
            <b>добавить</b>
          </button>
        </div>
      </div>
    </>
  )
}
