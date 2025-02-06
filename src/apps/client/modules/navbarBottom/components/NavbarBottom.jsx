import React from 'react'
import styles from '../assets/NavbarBottom.module.scss'
import { Link } from 'react-router-dom'

export default function NavbarBottom({ icons }) {
  return (
    <div className={styles['navbar']}>
      <div className="container">
        <div className={styles['icons-list']}>
          {icons.map((item) => (
            <Link to={item.link} className={styles['list-links']}>
              <div className={styles['list-item']} key={item.title}>
                <div>{item.counter ? <span>{item.counter}</span> : null}</div>
                {item.icon}
                <p>{item.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
  