import React from 'react'
import styles from './Reorder.module.scss'
import { useDispatch } from 'react-redux'
import { Reorder } from 'framer-motion'
import { selectedCategory } from '../../../store/appSlice'
import EditNoteIcon from '@mui/icons-material/EditNote'

export default function ReorderPage({
  updatePosition,
  items,
  setItems,
  select,
  setEditCategory,
  setNewCategory,
  setChangeItem,
}) {
  const dispatch = useDispatch()

  const handleChangeCategory = (item) => {
    setEditCategory(true)
    setNewCategory(item.name)
    setChangeItem({
      ...item,
    })
  }

  return (
    <div>
      {items && (
        <Reorder.Group axis="y" as="div" values={items} onReorder={setItems}>
          {items &&
            items.map((item) => (
              <Reorder.Item
                className={styles.but_col}
                key={item.id}
                value={item}
                onDragEnd={() => updatePosition()}
                whileDrag={{ scale: 1.1 }}
              >
                <button
                  key={item.id}
                  onClick={() => dispatch(selectedCategory(item.id))}
                  className={`btn mt-2 ${styles.but_col} ${
                    select === item.id ? styles.but_col_active : ''
                  }`}
                >
                  <div className={styles.button_name}>
                    <div className={styles.button_text}>{item.name}</div>
                    <EditNoteIcon
                      onClick={() => {
                        handleChangeCategory(item)
                      }}
                    />
                  </div>
                </button>
              </Reorder.Item>
            ))}
        </Reorder.Group>
      )}
    </div>
  )
}
