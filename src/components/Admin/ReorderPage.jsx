import React from 'react'
import styles from './Reorder.module.scss'
import { useDispatch } from 'react-redux'
import { Reorder, useDragControls } from 'framer-motion'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import { selectedCategory } from '@store/appSlice'
import EditNoteIcon from '@mui/icons-material/EditNote'

export default function ReorderPage({
  updatePosition,
  items,
  setItems,
  select,
}) {
  const dispatch = useDispatch()
  const controls = useDragControls()
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
                // dragListener={false}
                // dragControls={controls}
              >
                <button
                  key={item.id}
                  onClick={() => dispatch(selectedCategory(item.id))}
                  className={`btn mt-2 ${styles.but_col} ${
                    select === item.id ? styles.but_col_active : ''
                  }`}
                >
                  <div className={styles.button_name}>
                    {/* <DragIndicatorIcon
                      style={{ touchAction: 'none' }}
                      value={item}
                      onPointerDown={(e) => controls.start(e)}
                    /> */}
                    <div className={styles.button_text}>
                    {item.name}
                    </div>
                    <EditNoteIcon />
                  </div>
                </button>
              </Reorder.Item>
            ))}
        </Reorder.Group>
      )}
    </div>
  )
}
