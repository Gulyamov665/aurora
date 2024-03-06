import React, { useEffect, useRef, useState } from 'react'
import Card from './Card'
import { useGetProductsQuery } from '../store/admin/productsApi'
import { useGetCategoriesQuery } from '../store/admin/categoryApi'
import Loading from './Loading'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Navigation, Autoplay } from 'swiper/modules'
import { useGetPromosQuery } from '../store/admin/promoApi'

export default function Scroll() {
  const { data: category = [] } = useGetCategoriesQuery('bon')
  const {
    data: menuItems = [],
    isLoading,
    isError,
  } = useGetProductsQuery('bon')
  const { data: promo = [] } = useGetPromosQuery('bon')

  const sectionRefs = useRef([])
  const [activeIndex, setActiveIndex] = useState(0)

  const ChangeSlide = ({ position }) => {
    const swiper = useSwiper()

    useEffect(() => {
      if (swiper) {
        swiper.slideTo(position)
      }
    }, [swiper, position])
    // return null
  }

  useEffect(() => {
    const links = document.querySelectorAll('.nav__link')
    const cb = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          links.forEach((link) => link.classList.remove('active'))

          console.log(entry.target)
          const activeId = Number(entry.target.id)

          const activeLink = document.querySelector(
            `.nav__link[href="#${activeId}"]`
          )
          setActiveIndex(activeId)
          if (activeLink) {
            activeLink.classList.add('active')
          }
        }
      })
    }

    const observer = new IntersectionObserver(cb, {
      rootMargin: '0px',
      threshold: 0.75,
    })

    sectionRefs.current.forEach((sec) => {
      observer.observe(sec)
    })

    return () => {
      observer.disconnect()
    }
  }, [isLoading, category])

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <p>Error not found page </p>
  }
  console.log(category)

  return (
    <div>
      <nav>
        <div className="container">
          <Swiper
            slidesPerView={2}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Navigation, Autoplay]}
            pagination={true}
            className="scrollDiv"
          >
            {promo?.map((item) => (
              <SwiperSlide>
                <img className="imgScroll" src={item.photo} alt="" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="container sticky-top">
          <div className="custom-navbar">
            <Swiper
              slidesPerView={5}
              watchOverflow={true}
              freeMode={{ enabled: true, sticky: true }}
              pagination={{
                clickable: true,
              }}
              modules={Navigation}
              mousewheel={true}
            >
              <ChangeSlide position={activeIndex} />
              {category.map((item, index) => (
                <SwiperSlide key={item.id}>
                  <a className="nav__link" href={`#${index}`}>
                    {item.name}
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        {menuItems.length > 0 &&
          category.map((item, index) => (
            <div className="section" key={item.id} id={item.id}>
              <div className="container">
                <h2>{item.name}</h2>
                <div
                  className="row"
                  ref={(ref) => (sectionRefs.current[index] = ref)}
                  id={index}
                >
                  {menuItems
                    .filter((obj) => obj.category === item.id && obj.is_active)
                    .map((filteredObj) => (
                      <div
                        key={filteredObj.id}
                        className="col-6 col-sm-6 col-md-4 col-lg-3"
                      >
                        <Card
                          img={filteredObj.photo}
                          name={filteredObj.name}
                          desc={filteredObj.description}
                          price={filteredObj.price}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
      </nav>
    </div>
  )
}
