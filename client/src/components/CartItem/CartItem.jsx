import { useContext, useState } from "react";
import "./cartItem.css";
import { cartContext } from "../../App";
import { Link } from "react-router-dom";
import useFetch from "../../useFetch";
import toast, { Toaster } from "react-hot-toast";

const CartItem = ({ name, image, quantity, price, id }) => {
  const { data } = useFetch(
    `https://gadgets-backend.onrender.com/api/v1/product/${id}`
  );
  const { state, dispatch } = useContext(cartContext);
  const [amount, setAmount] = useState(quantity);

  const reduceAmount = () => {
    if (amount > 1) {
      setAmount((prevAmount) => prevAmount - 1);
      dispatch({
        type: "decrease_product_quantity",
        payload: { quantity: amount - 1, id },
      });
    }
  };
  const increaseAmount = () => {
    if (state.appCart.find((el) => el.id === id).quantity < data.quantity) {
      setAmount((prevAmount) => prevAmount + 1);
      dispatch({
        type: "increase_product_quantity",
        payload: { quantity: amount + 1, id },
      });
      return;
    }
    toast.error(
      `${data.quantity} ${data.name} left in stock. Cannot exceed ${data.quantity}`
    );
    return;
  };

  const removeProduct = () => {
    dispatch({ type: "remove_product_from_cart", payload: id });
  };

  return (
    <>
      <Toaster />
      <section className="cart-item">
        <img
          src={image}
          alt={name}
          style={{ display: "block" }}
          id="cart-image"
          className="cart-child"
        />
        <p className="cart-item-name cart-child">
          <Link to={`/product/${id}`} style={{ color: "var(--black)" }}>
            {name}
          </Link>
        </p>
        <div className="cart-item-btn-container">
          <div className="cart-item-quantity cart-child">
            <button type="button" onClick={reduceAmount}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.9}
                stroke="currentColor"
                className="size-6"
                style={{ width: "1.1rem" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14"
                />
              </svg>
            </button>
            {amount}
            <button type="button" onClick={increaseAmount}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.9}
                stroke="currentColor"
                className="size-6"
                style={{ width: "1.1rem" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
        </div>
        <p className="cart-item-price cart-child">&#8358;{price}</p>
        <button className="cart-item-remove cart-child" onClick={removeProduct}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.6}
            stroke="currentColor"
            className="size-6"
            style={{ width: "1.2rem" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </section>
    </>
  );
};

export default CartItem;
