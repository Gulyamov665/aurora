import React, { useState } from 'react'

export default function Card(props) {
  const [isOpen, setIsOpen] = useState(false)

 

  return (
    <>
      <div className="card">
        <img className="card__image" src={props.img} alt={props.name} />
        <div className="card__info">
          <div className="car__info--title">
            <h3>{props.name}</h3>
            <p className="card__info--price">{props.price} сум</p>
          </div>
        </div>
        {/* {isOpen && (
          <div
            style={{
              margin: '0 auto',
              // width: '50vh',
              backgroundColor: 'aliceblue',
              position: 'absolute',
              left: 0,
              right: 0,
              top: 5,
              zIndex: 100,
            }}
          >
            <img style={{ width: '100vw' }} src={props.img} alt="" />
          </div>
        )} */}
      </div>
    </>
  )
}
