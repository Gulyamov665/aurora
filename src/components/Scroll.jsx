import React, { useEffect, useRef, useState } from 'react'
import Card from './Card'
import { useGetProductsQuery } from '../store/productsApi'
import { useGetCategoriesQuery } from '../store/categoryApi'
import Loading from './Loading'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'

export default function Scroll() {
  const { data: category = [] } = useGetCategoriesQuery('bon')
  const {
    data: menuItems = [],
    isLoading,
    isError,
  } = useGetProductsQuery('bon')

  const sectionRefs = useRef([])
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef(null)
  const [swiperLink, setSwiperLink] = useState(null)

  const ChangeSlide = ({ position }) => {
    const swiper = useSwiper()

    useEffect(() => {
      if (swiper) {
        swiper.slideTo(position)
      }
    }, [swiper, position])
    return null
  }

  useEffect(() => {
    const links = document.querySelectorAll('.nav__link')
    const cb = (entries) => {
      entries.forEach((entry) => {
        if (
          (entry.isIntersecting && entry.intersectionRatio > 0.23) ||
          entry.intersectionRatio > 0.9
        ) {
          links.forEach((link) => link.classList.remove('active'))

          const activeId = entry.target.id

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
      threshold: 0.25,
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

  return (
    <nav>
      <div className="container sticky-top">
        <div className="custom-navbar">
          <Swiper
            slidesPerView={5}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Navigation]}
            mousewheel={true}
            className=""
          >
            {category.map((item) => (
              <SwiperSlide>
                <ChangeSlide position={activeIndex} />
                <a className="nav__link" href={`#${item.name}`}>
                  {item.name}
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {menuItems.length > 0 &&
        category.map((item, index) => (
          <div className="section" key={item.id} id={item.name}>
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
  )
}
