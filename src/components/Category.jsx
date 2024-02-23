import React, { useEffect, useRef, useState } from 'react'
import Card from './Card'
import { useGetProductsQuery } from '../store/productsApi'
import { useParams } from 'react-router-dom'
import { useGetCategoriesQuery } from '../store/categoryApi'
import Loading from './Loading'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Navigation } from 'swiper/modules'

export default function Category() {
  const { res } = useParams()
  const { data: category = [] } = useGetCategoriesQuery(res)
  const { data: menuItems = [], isLoading, isError } = useGetProductsQuery(res)

  const sectionRefs = useRef([])
  const [activeIndex, setActiveIndex] = useState(0)

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
        if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
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
            // watchOverflow={true}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={Navigation}
            // mousewheel={true}
            breakpoints={{
              320: {
                slidesPerView: 2.5,
                spaceBetween: 10,
              },
              480: {
                slidesPerView: 2.8,
              },
              640: {
                slidesPerView: 4,
              },
            }}
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
          <div id={item.name} className="section" key={item.id}>
            <div className="container">
              <h2 className="">{item.name}</h2>
              <div
                className="row"
                ref={(ref) => (sectionRefs.current[index] = ref)}
                id={index}
              >
                {menuItems
                  .filter((obj) => obj.category === item.id)
                  .map(
                    (filteredObj) =>
                      filteredObj.is_active && (
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
                      )
                  )}
              </div>
            </div>
          </div>
        ))}
    </nav>
  )
}
