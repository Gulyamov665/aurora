import React, { useEffect } from 'react'
import { motion, AnimatePresence, useDragControls } from 'framer-motion'

export default function CardView({ item, open, setIsOpen }) {
  const controls = useDragControls()

  useEffect(() => {
    if (open) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }

    // return () => {
    //   document.body.classList.remove('modal-open')
    // }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <div className="card_modal">
          <motion.div
            drag="y"
            dragControls={controls}
            dragElastic={0.7}
            dragMomentum={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={(event, info) => {
              if (info.offset.y > 100) {
                setIsOpen(!open)
              }
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              left: 0,
              right: 0,
              bottom: 0,
              background: 'white',
              padding: '20px',
              boxShadow: '0px -5px 10px rgba(0, 0, 0, 0.1)',
            }}
            className="card_view_motion"
          >
            <div className="container">
              <div className="card_view">
                <h2 style={{ paddingTop: '10px' }}>{item.name}</h2>
                <img className="card_view_img" src={item.photo} alt="" />
                <br />
                <b>Описание</b>
                <p>{item.description}</p>
                <p className="card_view_price">{item.price}</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
