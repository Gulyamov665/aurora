import React from 'react'
import styles from './AdminCard.module.scss'
import IOSSwitch from '../../client/components/MuiSwitch'
import FormControlLabel from '@mui/material/FormControlLabel'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import { useDispatch } from 'react-redux'
import { toggleUpdate } from '../../../store/appSlice'
import { useNavigate } from 'react-router-dom'

export default function AdminCard({
  item,
  isActive,
  onChange,
  setUpdatedItem,
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const updateProduct = (item) => {
    // dispatch(toggleUpdate())
    // setUpdatedItem(item)
    navigate(`${item}`)
  }

  return (
    <div className={`${styles.col_1} mt-2`}>
      <div className={styles.title}>
        <h6>{item.name}</h6>
        <FormControlLabel
          onClick={() => updateProduct(item.id)}
          control={<BorderColorIcon />}
        />
      </div>
      <div className={styles.iosBtn}>
        <FormControlLabel
          label="Активность"
          control={<IOSSwitch checked={isActive} onChange={onChange} />}
        />
      </div>
    </div>
  )
}
