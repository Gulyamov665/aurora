import React from 'react'
import { useNavigate } from 'react-router-dom'

import cartEmptyImg from '../../../assets/empty-cart.png'

export const CartEmpty = () => {
  const navigate = useNavigate()
  return (
    <div className="container text-center d-flex flex-column justify-content-between">
      <div>
        <h2>
          Корзина пустая <span>😕</span>
        </h2>
        <img width={'100%'} src={cartEmptyImg} alt="Empty cart" /> <br /> <br />
      </div>
      <button className="btn btn-outline-dark mt-5" style={{width: '90%', margin: '0 auto'}} onClick={() => navigate(-1)}>
        <span>Вернуться назад</span>
      </button>
    </div>
  )
}
