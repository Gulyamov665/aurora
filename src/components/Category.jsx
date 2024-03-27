import React, { useEffect, useRef, useState } from 'react'
import Card from './Card'
import { useGetProductsQuery } from '../store/user/productsApi'
import { useGetCategoriesQuery } from '../store/user/categoryApi'
import { useGetPromosQuery } from '../store/user/promoApi'
import { useParams } from 'react-router-dom'
import Loading from './Loading'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Navigation, Autoplay } from 'swiper/modules'
import CardView from './CardView'

export default function Category() {
  const { res } = useParams()
  const { data: category = [] } = useGetCategoriesQuery(res)
  const { data: menuItems = [], isLoading, isError } = useGetProductsQuery(res)
  const { data: promo = [] } = useGetPromosQuery(res)

  const sectionRefs = useRef([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [viewItem, setViewItem] = useState(null)

  const handleView = (item) => {
    setIsOpen(!isOpen)
    setViewItem(item)
  }

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
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          links.forEach((link) => link.classList.remove('active'))

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
      rootMargin: '10px',
      threshold: [0.3, 0.5, 1],
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
      <div className="container">
        <Swiper
          slidesPerView={4}
          autoplay={{
            delay: 2500,
            disableOnInteraction: true,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1.9,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 2.8,
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
      <div className="container sticky-top">
        <div className="custom-navbar">
          <Swiper
            slidesPerView={5}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={Navigation}
            mousewheel={true}
            breakpoints={{
              320: {
                slidesPerView: 2.5,
                spaceBetween: 10,
              },
              480: {
                slidesPerView: 2.8,
              },
              640: {
                slidesPerView: 5,
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
      <div className="round">
        {menuItems.length > 0 &&
          category.map((item, index) => (
            <div id={item.name} className="section" key={item.id}>
              <div className="container">
                <h2 className="cat_name pt-4">{item.name}</h2>
                <hr />
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
                            onClick={() => handleView(filteredObj)}
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
      </div>
      <CardView item={viewItem} open={isOpen} setIsOpen={setIsOpen} />
    </nav>
  )
}
