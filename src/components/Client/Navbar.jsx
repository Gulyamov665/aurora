import React, { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { Navigation, FreeMode } from 'swiper/modules'

export default function Navbar({ isSuccess, sectionRefs, category }) {
  const [activeIndex, setActiveIndex] = useState()
  const navLinks = useRef([])

  const ChangeSlide = ({ position }) => {
    const swiper = useSwiper()
    useEffect(() => {
      if (swiper) {
        swiper.slideTo(position - 1)
      }
    }, [swiper, position])
    return null
  }

  // useEffect(() => {
  //   const cb = (entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         navLinks.current.forEach((link) => link.classList.remove('active'))
  //         let activeId = Number(entry.target.id)
  //         const activeLink = navLinks.current[activeId]
  //         setActiveIndex(activeId)
  //         if (activeLink) {
  //           activeLink.classList.toggle('active')
  //         }
  //       }
  //     })
  //   }
  //   const observer = new IntersectionObserver(cb, {
  //     // rootMargin : '100px',
  //     threshold: [0.3, 0.85, 1],
  //   })
  //   sectionRefs.current.forEach((sec) => {
  //     observer.observe(sec)
  //   })

  //   return () => {
  //     observer.disconnect()
  //   }
  // }, [isSuccess])
  return (
    <div className="custom-navbar">
      <Swiper
        slidesPerView={5}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, FreeMode]}
        mousewheel={true}
        breakpoints={{
          320: {
            slidesPerView: 2.8,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 3,
          },
          640: {
            slidesPerView: 5,
          },
        }}
      >
        <ChangeSlide position={activeIndex} />
        {category.map((item, index) => (
          <SwiperSlide key={item.id}>
            <a
              className="nav__link"
              href={`#${index}`}
              ref={(ref) => (navLinks.current[index] = ref)}
            >
              {item.name}
            </a>
            <div className="animation"></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
