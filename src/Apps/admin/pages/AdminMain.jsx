import React from 'react'
import styles from '../static/AdminMain.module.scss'

export default function AdminMain() {
  return (
    <div className={styles.restaurant}>
      <div className={styles.restaurant_container}>
        <img src="/img/12.jpg" className={styles.restaurant_image} alt="" />
      </div>
      <div className={styles.restaurant_card}>
        <h2>Chaikhana</h2>

        <label className={styles.restaurant_input}>
          <input type="text" placeholder="Название" />
        </label>
        <label className={styles.restaurant_input}>
          <input type="text" placeholder="Адрес" />
        </label>
        <label className={styles.restaurant_input}>
          <input type="text" placeholder="Логотип" />
        </label>
        <label className={styles.restaurant_input}>
          <input type="text" placeholder="Обложка" />
        </label>

        <div className={styles.button_form}>
          <button className={`${styles.button_form} btn btn-success`}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  )
}
