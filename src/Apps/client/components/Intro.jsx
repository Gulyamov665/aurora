import React from 'react'
import styles from '../static/Intro.module.scss'

export default function Intro(props) {
  return (
    <div className='container'>
      <div className="section">
        <img src={props.img} className={styles.img} alt="img" />
        <div className={styles.op} />
        <div className={styles.img_log}>
          <img src={props.logo} className={styles.img_logo} alt="logo" />
        </div>
      </div>
      <div className="container container-sm mt-4">
        <h1 className={styles.texts}>{props.name}</h1>
        <p className={styles.texts}>{props.location}</p>
      </div>
    </div>
  )
}
