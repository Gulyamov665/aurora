import { FC, useState } from "react";
import { CardType } from "./types";

import { formatPrice } from "@/Utils/tools";

const Card: FC<CardType> = ({ id, photo, name, price, addToCart }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <div className="card">
        {!isLoaded && <div className="skeleton" />}

        <img
          className="card__image"
          loading="lazy"
          src={photo}
          alt={name}
          onLoad={() => setIsLoaded(true)}
          style={{ opacity: isLoaded ? 1 : 0 }}
        />

        <div className="card__info">
          <div className="car__info--title">
            {price && <p className="card__info--price">{formatPrice(price)} сум</p>}
            <h3>{name}</h3>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <button className="btn card-btn-order" onClick={(e) => addToCart(e, { id, name, price, photo })}>
            <b>+ Добавить</b>
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
