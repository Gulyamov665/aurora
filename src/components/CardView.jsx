import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CardView({ item, open }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 800 }}
          animate={{ opacity: 1, x: 0, y: 12 }}
          transition={{ delay: 0.1, duration: 0.3 }}
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
      )}
    </AnimatePresence>
  )
}
