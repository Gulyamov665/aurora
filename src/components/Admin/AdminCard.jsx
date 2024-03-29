import React from 'react'
import styles from './AdminCard.module.scss'
import IOSSwitch from '../Client/MuiSwitch'
import FormControlLabel from '@mui/material/FormControlLabel'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import { useDispatch } from 'react-redux'
import { toggleUpdate } from '../../store/appSlice'

export default function AdminCard({
  item,
  isActive,
  onChange,
  setUpdatedItem,
}) {
  const dispatch = useDispatch()

  const handleClickTest = (item) => {
    dispatch(toggleUpdate())
    setUpdatedItem(item)
  }

  return (
    <div className={`${styles.col_1} mt-2`}>
      <div className={styles.title}>
        <h6>{item.name}</h6>
        <FormControlLabel
          onClick={() => handleClickTest({ ...item })}
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
