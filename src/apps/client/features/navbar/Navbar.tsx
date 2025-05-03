import { useState, useEffect, useRef, FC } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import { useObserver } from "../../../../hooks/useObserver";
import { intersectionScrollSpyFunc } from "../../../../Utils/scrollSpy.ts";
import { NavbarProps } from "./types";

const Navbar: FC<NavbarProps> = ({ sectionRefs, category, rootRef }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navLinks = useRef<HTMLAnchorElement[]>([]);
  const entries = useObserver(sectionRefs, {
    root: rootRef && rootRef.current[0],
    rootMargin: "-50% 0px -50% 0px",
  });

  const ChangeSlide = ({ position }: { position: number }) => {
    const swiper = useSwiper();
    useEffect(() => {
      if (swiper) {
        swiper.slideTo(position - 1);
      }
    }, [swiper, position]);
    return null;
  };

  useEffect(() => {
    intersectionScrollSpyFunc(entries, navLinks, setActiveIndex);
  }, [entries]);

  const breakpoints = {
    320: {
      slidesPerView: 2.8,
      spaceBetween: 10,
    },
    480: {
      slidesPerView: 3,
    },
    640: {
      slidesPerView: 6,
      spaceBetween: 5,
    },
  };

  return (
    <div className="container">
      <div id="nav" className="custom-navbar">
        <Swiper
          slidesPerView={6}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[Navigation, FreeMode]}
          mousewheel={true}
          breakpoints={breakpoints}
        >
          <ChangeSlide position={activeIndex} />
          {category
            .filter((obj) => obj.is_active)
            .map((item, index) => (
              <SwiperSlide key={item.id}>
                <a
                  className={`nav__link ${activeIndex === index ? "active" : ""}`}
                  href={`#${index}`}
                  ref={(ref) => {
                    if (ref) navLinks.current[index] = ref;
                  }}
                >
                  {item.name}
                </a>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Navbar;
