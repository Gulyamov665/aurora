import React from 'react'
import { motion, AnimatePresence, useDragControls } from 'framer-motion'
import { useSwipeable } from 'react-swipeable'

export default function CardView({ item, open, setIsOpen }) {
  // const handlers = useSwipeable({
  //   onSwipedDown: () => setIsOpen(false),
  //   preventDefaultTouchmoveEvent: true,
  // })

  const controls = useDragControls()
  console.log(controls)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          // {...handlers}
          drag="y"
          dragControls={controls}
          dragElastic={0.1} // Настройка упругости перетаскивания
          dragMomentum={false} // Отключение инерции перетаскивания
          dragConstraints={{ top: 0, bottom: 0 }} // Ограничение перетаскивания карточки внутри окна
          onDragEnd={(event, info) => {
            if (info.offset.y > 100) {
              setIsOpen(false) // Закрываем карточку, если она была перетащена вниз на расстояние больше 100px
            }
          }}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.3 }}
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
      )}
    </AnimatePresence>
  )
}
