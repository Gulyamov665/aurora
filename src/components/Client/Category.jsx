import React, { useEffect, useRef, useState } from 'react'
import Card from './Card'
import { useGetProductsQuery } from '../../store/user/productsApi'
import { useGetCategoriesQuery } from '../../store/user/categoryApi'
import { useGetPromosQuery } from '../../store/user/promoApi'
import { useParams } from 'react-router-dom'
import Loading from './Loading'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Navigation, Autoplay } from 'swiper/modules'
import CardView from './CardView'
import Promo from './Promo'

export default function Category({ search }) {
  const { res } = useParams()
  const { data: category = [] } = useGetCategoriesQuery(res)
  const {
    data: menuItems = [],
    isLoading,
    isError,
    isSuccess,
  } = useGetProductsQuery(res)
  const { data: promo = [] } = useGetPromosQuery(res)

  const sectionRefs = useRef([])
  const navLinks = useRef([])
  const [activeIndex, setActiveIndex] = useState()
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
    const cb = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
          navLinks.current.forEach((link) => link.classList.remove('active'))

          let activeId = Number(entry.target.id)

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
      threshold: [0.3, 1],
    })

    sectionRefs.current.forEach((sec) => {
      observer.observe(sec)
    })

    return () => {
      observer.disconnect()
    }
  }, [isSuccess])

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <p>Error not found page </p>
  }

  return (
    <nav>
      <Promo promo={promo} />
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
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="round">
        {search
          ? menuItems
              .filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((searchItem) => (
                <div key={searchItem.id} onClick={() => handleView(searchItem)}>
                  <Card
                    img={searchItem.photo}
                    name={searchItem.name}
                    desc={searchItem.description}
                    price={searchItem.price}
                  />
                </div>
              ))
          : menuItems.length > 0 &&
            category.map((item, index) => (
              <div id={item.name} className="section" key={item.id}>
                <div
                  className="container"
                  ref={(ref) => (sectionRefs.current[index] = ref)}
                  id={index}
                >
                  <h2 className="cat_name pt-4">{item.name}</h2>
                  <hr />
                  <div className="row">
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
