
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSendMessageMutation } from "@store/user/api/dispatcherApi";
import { useLoadQuery } from "@store/admin/vendorApi";
import { removeCartItems } from "@store/cartSlice";
import { RootState } from "@store/index";

function ConfirmOrder() {
  const { table, res } = useParams();
  const { items: items, totalPrice } = useSelector((state: RootState) => state.cart);
  const { data = [] } = useLoadQuery(res);
  const [dispatcher, { isLoading }] = useSendMessageMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOrders = async () => {
    if (data.orders_chat_id) {
      const order = {
        items,
        totalPrice,
        table,
        chat_id: data.orders_chat_id,
        availability: data.availability_orders,
      };
      await dispatcher(order);
      dispatch(removeCartItems());
      navigate(-1);
      toast.success("Заказ отправлен");
      return;
    }
  };

  return (
    <div>
      <div
        className="d-flex justify-content-between  align-items-center"
        style={{
          width: "90%",
          height: 70,
          position: "fixed",
          bottom: "20px",
          left: "50%",
          background: "#b6b6b6",
          transform: "translateX(-50%)",
          borderRadius: 20,
          padding: 20,
          zIndex: 10000,
          margin: "auto",
          cursor: "pointer",
          color: "#fff",
          fontWeight: "bold",
          fontSize: "18px",
        }}
      >
        <div>
          {/* <CurrencyFormat value={totalPrice} displayType={"text"} thousandSeparator={" "} suffix={" Сум"} />{" "} */}
        </div>
        <div>
          {isLoading ? (
            <button className={"btnOrderStyleLoad btn-warning"}>
              <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
            </button>
          ) : (
            <button className={"btnOrderStyle btn-warning"} onClick={handleOrders}>
              Заказать
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConfirmOrder;
