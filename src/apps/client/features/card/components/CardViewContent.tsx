import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CurrencyFormat from "react-currency-format";
import { FC } from "react";
import { CardViewContentProps } from "../types";
import { RadioGroupCustom } from "@/apps/common/RadioGroup";
import CloseIcon from "@mui/icons-material/Close";

export const CardViewContent: FC<CardViewContentProps> = ({
  item,
  count,
  setCount,
  setIsOpen,
  onAdd,
  selectedVariant,
  setSelectedVariant,
}) => {
  return (
    <>
      <div className="card_view_container">
        <div className="close_icon" onClick={() => setIsOpen(false)}>
          <CloseIcon />
        </div>

        <div className="card_view_scrollable">
          <div className="card_view">
            <img className="card_view_img" loading="lazy" src={item.photo} alt="" />
          </div>
          <div className="card_view_content">
            <div className="container card_description_name">
              <h2 style={{ padding: "10px 0px 0px", marginBottom: "0px" }}>
                <b> {item.name}</b> <hr style={{ margin: "16px 0 0px" }} />
              </h2>

              <div className="card_view_desc">
                <p style={{ padding: "10px 0", whiteSpace: "break-spaces" }}>{item.description}</p>
              </div>
              <div className="radio_group">
                <RadioGroupCustom
                  data={item.options}
                  selectedVariant={selectedVariant}
                  setSelectedVariant={setSelectedVariant}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card_view_price">
          <button className="btn btn-warning w-100 me-4 btnStyle" onClick={onAdd}>
            <strong
              style={{
                color: "#333333",
              }}
            >
              <CurrencyFormat value={item.price * count} displayType={"text"} thousandSeparator={" "} suffix={" Сум"} />
            </strong>
          </button>

          <div className="btn-group card_counter_box">
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
      {item.description && (
        <div className="card_view_desc_full_width">
          <div>
            <b>Состав</b>
            <p style={{ padding: "10px 0", whiteSpace: "break-spaces" }}>{item.description}</p>
          </div>
        </div>
      )}
    </>
  );
};
