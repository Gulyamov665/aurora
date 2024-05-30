import React, { useEffect } from 'react'
import { motion, AnimatePresence, useDragControls } from 'framer-motion'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import CurrencyFormat from 'react-currency-format'

export default function CardView({ item, open, setIsOpen, count, setCount }) {
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
        <div>
          <div className="card_modal" onClick={() => setIsOpen(!open)}></div>

          <motion.div
            drag="y"
            dragControls={controls}
            dragElastic={{ top: 0, bottom: 1 }}
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
              bottom: 0,
              background: 'white',
            }}
            className="card_view_motion"
          >
            <div className="card_view">
              <img className="card_view_img" src={item.photo} alt="" />
              <h2>
                {item.name} <hr />
              </h2>

              <div className="card_view_desc">
                <p>{item.description}</p>
              </div>
            </div>

            <div className="card_view_price">
              <button className="btn btn-warning w-100 me-4">
                <strong style={{ color: '#333333' }}>
                  <CurrencyFormat
                    value={item.price * count}
                    displayType={'text'}
                    thousandSeparator={' '}
                    suffix={' Сум'}
                  />
                </strong>
              </button>

              <div className="btn-group">
                <button
                  className={
                    count > 1
                      ? 'btn text-danger '
                      : 'btn text-light grey disabled'
                  }
                  onClick={() => setCount(count - 1)}
                >
                  <RemoveIcon sx={{ fontSize: 20, color: 'black' }} />
                </button>

                <button className="btn text-black">{count}</button>
                <button
                  className="btn text-success"
                  onClick={() => setCount(count + 1)}
                >
                  <AddIcon sx={{ fontSize: 20, color: 'black' }} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
