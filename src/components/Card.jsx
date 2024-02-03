import React from 'react'

export default function Card(props) {
  return (
    <div className="card">
      <img className="card__image" src={props.img} alt={props.name} />
      <div className="card__info">
        <div className="car__info--title">
          <h3>{props.name}</h3>
          <p className="card__info--price">{props.price} сум</p>
        </div>
      </div>
    </div>
  )
}
