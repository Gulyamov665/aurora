import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper/modules'

export default function Promo({ promo, setShowStory }) {
  return (
    <div>
      <div className="container">
        {promo.length > 0 && (
          <Swiper
            slidesPerView="auto"
            freeMode={true}
            modules={[FreeMode]}
            pagination={true}
            className="scrollDiv"
          >
            {promo
              ?.filter((promos) => promos.is_active)
              .map((item) => (
                <SwiperSlide key={item.id}>
                  <img
                    className="imgScroll"
                    onClick={() => setShowStory(true)}
                    src={item.photo}
                    alt="item.name"
                  />
                  <b className="text_promo">{item.name}</b>
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </div>
    </div>
  )
}
