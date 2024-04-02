import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence, useDragControls } from 'framer-motion'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'

export default function CardView({ item, open, setIsOpen }) {
  const [count, setCount] = useState(1)

  const controls = useDragControls()

  useEffect(() => {
    if (open) {
      document.body.classList.toggle('modal-open')
    }

    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <div className="card_modal">
          <motion.div
            drag="y"
            dragControls={controls}
            dragElastic={{ top: 0, bottom: 2 }}
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={(event, info) => {
              if (info.offset.y > 100) {
                setIsOpen(false)
              }
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              // left: 0,
              // right: 0,
              bottom: 0,
              background: 'white',
              // padding: '20px',
              // boxShadow: '0px -5px 10px rgba(0, 0, 0, 0.1)',
            }}
            className="card_view_motion"
          >
            <div className="card_view">
              <img className="card_view_img" src={item.photo} alt="" />
              <h2>
                {item.name} <hr />
              </h2>
              <p className="card_view_desc">{item.description}</p>
            
            <div className="card_view_price">
              <button className="btn btn-warning w-100 me-4">
                <strong style={{ color: '#333333' }}>
                  {item.price * count} сум
                </strong>
              </button>

              <div className="btn-group">
                <button
                  className={
                    count > 1
                      ? 'btn text-light grey '
                      : 'btn text-light grey disabled'
                  }
                  onClick={() => setCount(count - 1)}
                >
                  <RemoveIcon sx={{ fontSize: 20 }} />
                </button>

                <button className="btn text-light grey">{count}</button>
                <button
                  className="btn text-light grey"
                  onClick={() => setCount(count + 1)}
                >
                  <AddIcon sx={{ fontSize: 20 }} />
                </button>
              </div>
            </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
