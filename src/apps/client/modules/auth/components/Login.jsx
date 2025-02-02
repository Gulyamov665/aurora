import React from 'react'
import styles from '../assets/AuthForm.module.scss'
import { Link } from 'react-router-dom'

export default function Login({ register, handleSubmit, state }) {
  return (
    <form className="text-center" onSubmit={handleSubmit}>
      <h1>Войти</h1>
      <div className="mt-3">
        <input
          type="text"
          name=""
          id="login"
          {...register('login')}
          placeholder="Логин"
        />
      </div>
      <div className="mt-3">
        <input
          type="password"
          name=""
          id="password"
          {...register('password')}
          placeholder="Пароль"
        />
      </div>
      <p>
        Нет аккаунта ?{' '}
        <Link to={`/register`} state={state}>
          <span>Регистрация</span>{' '}
        </Link>
      </p>
      <button className={styles['form-button']}>Войти</button>
    </form>
  )
}
