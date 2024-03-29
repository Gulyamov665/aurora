import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'

export default function Promo({ promo }) {
  return (
    <div>
      <div className="container">
        <Swiper
          slidesPerView={4}
          autoplay={{
            delay: 2500,
            disableOnInteraction: true,
          }}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 7,
            },
            480: {
              slidesPerView: 3,
            },
            640: {
              slidesPerView: 4,
            },
          }}
          modules={[Navigation, Autoplay]}
          pagination={true}
          className="scrollDiv"
        >
          {promo?.map((item) => (
            <SwiperSlide key={item.id}>
              <img className="imgScroll" src={item.photo} alt="item.name" />
              <b className="text_promo">{item.name}</b>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
