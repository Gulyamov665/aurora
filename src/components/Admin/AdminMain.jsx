import React from 'react'
import styles from './AdminMain.module.scss'

export default function AdminMain() {
  return (
    <div className={styles.restaurant}>
      {/* <div className={styles.restaurant_container}> */}
      <img src="/img/12.jpg" className={styles.restaurant_image} alt="" />
      {/* </div> */}
      {/* <div className={styles.restaurant_card}> */}
        {/* <h2>Chaikhana</h2>
        <label className={styles.restaurant_input}>
          <input type="text" placeholder="name" />
        </label>
        <label className={styles.restaurant_input}>
          <input type="text" placeholder="adress" />
        </label>
        <label className={styles.restaurant_input}>
          <input type="text" placeholder="logo" />
        </label>
        <label className={styles.restaurant_input}>
          <input type="text" placeholder="image" />
        </label> */}
      {/* </div> */}
    </div>
  )
}
