import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper/modules'

export default function Promo({ promo, handleViewPromo }) {
  return (
    <div>
      <div className="container">
        {promo.length > 0 && (
          <Swiper
            slidesPerView={4}
            freeMode={true}
            modules={[FreeMode]}
            breakpoints={{
              320: {
                slidesPerView: 1.8,
                // spaceBetween: 1,
              },
              375: {
                slidesPerView: 2,
              },
              425: {
                slidesPerView: 2.5,
              },
              480: {
                slidesPerView: 3,
              },
              640: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
            }}
            pagination={true}
            className="scrollDiv"
          >
            {promo
              ?.filter((promos) => promos.is_active)
              .map((item) => (
                <SwiperSlide
                  key={item.id}
                  onClick={() => handleViewPromo(item)}
                >
                  <img className="imgScroll" src={item.photo} alt="item.name" />
                  <b className="text_promo">{item.name}</b>
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </div>
    </div>
  )
}
