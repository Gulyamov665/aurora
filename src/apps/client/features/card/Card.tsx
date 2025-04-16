import { FC, useState } from "react";
import { CardType } from "./types";

import { formatPrice } from "@/Utils/tools";
import { CounterBox } from "@/apps/common/CounterBox";

const Card: FC<CardType> = ({ product, addToCart, findItem, decrease }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <div className="card">
        {!isLoaded && <div className="skeleton" />}

        <img
          className="card__image"
          loading="lazy"
          src={product.photo}
          alt={product.name}
          onLoad={() => setIsLoaded(true)}
          style={{ opacity: isLoaded ? 1 : 0 }}
        />

        <div className="card__info">
          <div className="car__info--title">
            {product.price && <p className="card__info--price">{formatPrice(product.price)} сум</p>}
            <h3>{product.name}</h3>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          {findItem(product.id) ? (
            <button className="btn card-btn-order" onClick={(e) => e.stopPropagation()}>
              <CounterBox
                increase={(e) => addToCart(e, product)}
                decrease={(e) => decrease(e, product.id)}
                quantity={findItem(product.id).quantity}
              />
            </button>
          ) : (
            <button className="btn card-btn-order" onClick={(e) => addToCart(e, product)}>
              <b>Добавить</b>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Card;
