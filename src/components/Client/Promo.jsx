import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper/modules'

export default function Promo({ promo, setShowStory }) {
  return (
    <div>
      <div className="container">
        <Swiper
          slidesPerView="auto"
          freeMode={true}
          modules={[FreeMode]}
          // autoplay={{
          //   delay: 2500,
          //   disableOnInteraction: true,
          // }}
          breakpoints={
            {
              // 320: {
              //   slidesPerView: 'auto',
              //   spaceBetween: 7,
              // },
              // 480: {
              //   slidesPerView: 3,
              // },
              // 640: {
              //   slidesPerView: 4,
              // },
            }
          }
          // modules={[Navigation, Autoplay]}
          pagination={true}
          className="scrollDiv"
        >
          {promo?.map((item) => (
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
      </div>
    </div>
  )
}
