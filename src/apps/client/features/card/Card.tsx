import { FC, useState, MouseEvent } from "react";
import { addCartItem } from "../../../../store/cartSlice";
import { useDispatch } from "react-redux";
import { CardType, CartItem } from "./types";
import CurrencyFormat from "react-currency-format";

const Card: FC<CardType> = ({ id, photo, name, price, is_active, restaurant, availability, category }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  const addToCart = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const cartItem: CartItem = {
      id,
      photo,
      name,
      price,
      is_active,
      restaurant,
      availability,
      category,
      count: 1,
    };
    dispatch(addCartItem(cartItem));
  };

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
            <p className="card__info--price">
              <CurrencyFormat value={price} displayType={"text"} thousandSeparator={" "} suffix={" сум"} />
            </p>
            <h3>{name}</h3>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <button className="btn card-btn-order" onClick={addToCart}>
            <b>+ Добавить</b>
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
