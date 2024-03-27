import React, { useEffect } from 'react'
import { motion, AnimatePresence, useDragControls } from 'framer-motion'

export default function CardView({ item, open, setIsOpen }) {
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
            dragDirection="down"
            dragControls={controls}
            dragElastic={2}
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
            <div className="">
              <div className="card_view">
                <img className="card_view_img" src={item.photo} alt="" />
                <h2 style={{ paddingTop: '10px' }}>{item.name}</h2>
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
