import React, { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { Navigation, FreeMode } from 'swiper/modules'
import { useObserver } from '../../../hooks/useObserver'
import { intersectionScrollSpyFunc } from '../../../Utils/scrollSpy'

export default function Navbar({ sectionRefs, category, rootRef }) {
  const [activeIndex, setActiveIndex] = useState()
  const navLinks = useRef([])
  const entries = useObserver(sectionRefs, {
    root: rootRef.current[0],
    rootMargin: '-50% 0px -50% 0px',
  })

  const ChangeSlide = ({ position }) => {
    const swiper = useSwiper()
    useEffect(() => {
      if (swiper) {
        swiper.slideTo(position - 1)
      }
    }, [swiper, position])
    return null
  }

  useEffect(() => {
    intersectionScrollSpyFunc(entries, navLinks, setActiveIndex)
  }, [entries])

  return (
    <div id="nav" className="custom-navbar">
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
        {category
          .filter((obj) => obj.is_active)
          .map((item, index) => (
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
