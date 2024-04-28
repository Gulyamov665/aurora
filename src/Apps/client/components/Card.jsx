import React from 'react'
import CurrencyFormat from 'react-currency-format'

export default function Card(props) {
  return (
    <>
      <div className="card">
        <img className="card__image" src={props.img} alt={props.name} />
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
      </div>
    </>
  )
}
