import React from 'react'
import styles from './AdminPromo.module.scss'
import FormControlLabel from '@mui/material/FormControlLabel'
import EditNoteIcon from '@mui/icons-material/EditNote'
import IOSSwitch from '../MuiSwitch'
import { useGetPromosQuery } from '../../store/promoApi'
import { useParams } from 'react-router-dom'

const AdminPromo = () => {
  const { res } = useParams()
  const { data: promo = [] } = useGetPromosQuery(res)

  console.log(promo)
  return (
    <div className={`${styles.container_promo}`}>
      {promo?.map((item) => (
        <div className={`${styles.card_promo}`}>
          <div className={styles.img}>
            <img src={item.photo} alt="" />
          </div>
          <div className={styles.name}>Купи 2 Пицца за 99.000 сум</div>
          <div className={styles.name_active}>
            <FormControlLabel
              control={<IOSSwitch checked={'isActive'} onChange={'onChange'} />}
              label="Активность"
            />
            <EditNoteIcon />
          </div>
          <div className={styles.switch}></div>
        </div>
      ))}
    </div>
  )
}

export default AdminPromo
