import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Promo() {
  const [selectedId, setSelectedId] = useState(null)

  const items = [
    { id: 1, subtitle: 'Hello', title: 'World' },
    { id: 2, subtitle: 'West', title: 'Cost' },
  ]

  return (
    <div>
      {items.map((item) => (
        <motion.div
          key={item.id} // Добавьте ключ для каждого элемента
          layoutId={item.id}
          onClick={() => setSelectedId(item.id)}
        >
          <motion.h5>{item.subtitle}</motion.h5>
          <motion.h2>{item.title}</motion.h2>
        </motion.div>
      ))}

      <AnimatePresence>
        {selectedId && (
          <motion.div
            layoutId={selectedId}
            onClick={() => setSelectedId(null)}
            style={{ border: '1px solid black' }}
          >
            <motion.h5>
              {items.find((item) => item.id === selectedId).subtitle}
            </motion.h5>
            <motion.h2>
              {items.find((item) => item.id === selectedId).title}
            </motion.h2>
            <motion.button onClick={() => setSelectedId(null)}>
              Close
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
