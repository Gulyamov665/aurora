import React from 'react'
import card from '../static/Card.module.scss'

export default function Card(props) {
  return (
    <>
      <div className={card.card}>
        <img className={card.card__image} src={props.img} alt={props.name} />
        <div className={card.card__info}>
          <div className={`${card.car__info}--title`}>
            <h3>{props.name}</h3>
            <p className={`${card.card__info}--price`}>{props.price} сум</p>
          </div>
        </div>
      </div>
    </>
  )
}
