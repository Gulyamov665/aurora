import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CurrencyFormat from "react-currency-format";
import { FC } from "react";
import { CardViewContentProps } from "../types";

const CardViewContent: FC<CardViewContentProps> = ({ addToCart, item, count, setCount }) => {
  return (
    <div>
      <div className="card_view">
        <img className="card_view_img" loading="lazy" src={item.photo} alt="" />
        <div className="container card_description_name">
          <h2>
            {item.name} <hr />
          </h2>

          <div className="card_view_desc">
            <p>{item.description}</p>
          </div>
        </div>
      </div>

      <div className="card_view_price">
        <button className="btn btn-warning w-100 me-4 btnStyle" onClick={() => addToCart(item)}>
          <strong
            style={{
              color: "#333333",
            }}
          >
            <CurrencyFormat value={item.price * count} displayType={"text"} thousandSeparator={" "} suffix={" Сум"} />
          </strong>
        </button>

        <div className="btn-group">
          <button
            className={count > 1 ? "btn text-danger " : "btn text-light grey disabled"}
            onClick={() => setCount(count - 1)}
          >
            <RemoveIcon
              sx={{
                fontSize: 20,
                color: "black",
              }}
            />
          </button>

          <button className="btn text-black">{count}</button>
          <button className="btn text-success" onClick={() => setCount(count + 1)}>
            <AddIcon
              sx={{
                fontSize: 20,
                color: "black",
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardViewContent;
