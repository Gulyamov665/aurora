import styles from '../assets/NavbarBottom.module.css'
import { Link } from 'react-router-dom'
import { NavbarBottomProps } from '../interfaces/interface'

export default function NavbarBottom({ icons }: NavbarBottomProps) {
  return (
    <div className={styles['navbar']}>
      <div className="container">
        <div className={styles['icons-list']}>
          {icons.map((item) => (
            <Link
              to={item.link}
              className={styles['list-links']}
              key={item.title}
            >
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
