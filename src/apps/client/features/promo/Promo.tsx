import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { FC } from "react";
import { PromoTypes } from "./types";
import { Grid } from "@mui/material";
import PromoCard from "./PromoCard";

const Promo: FC<PromoTypes> = ({ promo, handleViewPromo }) => {
  const breakpoints = {
    320: {
      slidesPerView: 3,
      spaceBetween: 2,
    },
    375: {
      slidesPerView: 3,
      spaceBetween: 4,
    },
    425: {
      slidesPerView: 3,
      spaceBetween: 4,
    },
    480: {
      slidesPerView: 3,
      spaceBetween: 8,
    },
    640: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 6,
      spaceBetween: 8,
    },
  };

  const promoData = [
    {
      id: 1,
      title: "2+1",
      description: "Купи 2, получи 1 бесплатно",
      gradient: "linear-gradient(135deg, #FF6B6B, #FFD93D)",
    },
    {
      id: 2,
      title: "Скидка 30%",
      description: "На любимое блюдо недели",
      gradient: "linear-gradient(135deg, #FF61D2, #FE9090)",
    },
    {
      id: 3,
      title: "Комбо",
      description: "Бургер + картошка + напиток",
      gradient: "linear-gradient(135deg, #42E695, #3BB2B8)",
    },
    {
      id: 4,
      title: "Доставка бесплатно",
      description: "При заказе от 1000₽",
      gradient: "linear-gradient(135deg, #4D96FF, #38B6FF)",
    },
    {
      id: 5,
      title: "1+1=❤️",
      description: "Закажи одно блюдо, второе в подарок",
      gradient: "linear-gradient(135deg, #D4145A, #FBB03B)",
    },
    {
      id: 6,
      title: "Только сегодня",
      description: "Скидка 50% на вторую пиццу",
      gradient: "linear-gradient(135deg, #833AB4, #FD1D1D)",
    },
    {
      id: 7,
      title: "Счастливые часы",
      description: "С 14:00 до 16:00 — напиток бесплатно",
      gradient: "linear-gradient(135deg, #FF416C, #FF4B2B)",
    },
    {
      id: 8,
      title: "Выходной Комбо",
      description: "3 блюда по цене 2 в выходные",
      gradient: "linear-gradient(135deg, #F00000, #DC281E)",
    },
    {
      id: 9,
      title: "Новинка!",
      description: "Попробуй новое блюдо недели",
      gradient: "linear-gradient(135deg, #8E2DE2, #4A00E0)",
    },
    {
      id: 10,
      title: "Скидка 20%",
      description: "При первом заказе в приложении",
      gradient: "linear-gradient(135deg, #F7971E, #FFD200)",
    },
    {
      id: 11,
      title: "Завтрак со скидкой",
      description: "До 12:00 — минус 25% на завтраки",
      gradient: "linear-gradient(135deg, #FF512F, #DD2476)",
    },
    {
      id: 12,
      title: "Комбо на двоих",
      description: "Идеально для пары 🍽️",
      gradient: "linear-gradient(135deg, #3A1C71, #D76D77)",
    },
  ];

  return (
    <div>
      <div className="container">
        {promo && (
          <Swiper
            slidesPerView={6}
            freeMode={true}
            modules={[FreeMode]}
            breakpoints={breakpoints}
            className="scrollDiv"
          >
            <Grid container spacing={4}>
              {promoData
                // .filter((promos) => promos.is_active)
                .map((promo) => (
                  <SwiperSlide key={promo.id} onClick={() => handleViewPromo(promo as any)}>
                    <Grid item key={promo.id}>
                      <PromoCard {...promo} />
                    </Grid>
                  </SwiperSlide>
                ))}
            </Grid>
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default Promo;
