import { useContext, useEffect, useState } from "react";
import "./cart.css";
import { Header } from "../../components/Header";
import { Product } from "../../components/Product";
import { CartItem } from "../../components/CartItem";
import { cartContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import useFetch from "../../useFetch";
import axios from "axios";
import { Footer } from "../../components/Footer";

const Cart = () => {
  const navigate = useNavigate();
  let obj = {};
  const { state, dispatch } = useContext(cartContext);
  const [amount, setAmount] = useState(0);
  const { data: products, fetching: productsFetching } = useFetch(
    `https://gadgets-backend.onrender.com/api/v1/product?limit=3`
  );

  // check query params and verify transaction
  async function checkQueryAndVerifyTrx() {
    // check query params-----------------
    window.location.search
      .substring(1)
      .trim()
      .split("&")
      .map((el) => {
        const queryArr = el.split("=");
        return { [queryArr[0]]: queryArr[1] };
      })
      .forEach((el) => {
        const objArr = Object.keys(el);
        const objArrVal = Object.values(el).map((item) => {
          if (item?.includes("%20")) {
            item = item?.split("%20")?.join(" ");
          }
          return item;
        });
        obj = { ...obj, [objArr[0]]: objArrVal[0] };
      });
    // console.log(obj);
    // console.log(Boolean(obj?.reference));

    // verify transaction ----------------
    if (obj?.reference) {
      const toastId = toast.loading(`Verifying transaction...`);
      try {
        const response = await axios.get(
          `https://gadgets-backend.onrender.com/api/v1/payment/verify/${obj?.reference}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);

        // if transaction was successful ---------------
        if (response.data.status === "success") {
          // create order --------------
          try {
            const response = await axios.post(
              `https://gadgets-backend.onrender.com/api/v1/order`,
              { order: state.appCart },
              {
                withCredentials: true,
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            toast.dismiss(toastId);
            console.log(response.data);
            // once order is placed, clear cart ------------
            dispatch({ type: `order_placed` });
            navigate(`/cart`);
            toast.success(`Your order has been placed!`);
            return;
          } catch (err) {
            toast.dismiss(toastId);
            console.log(err);
            // once order is placed, clear cart ------------
            dispatch({ type: `order_placed` });
            navigate(`/cart`);
            toast.success(`Your order has been placed!`);
            return;
          }
        }
        return;
      } catch (error) {
        console.log(error);
        return;
      }
    } else {
      return;
    }
  }

  // checkout
  const checkout = async function () {
    const data = { order: state.appCart, amount: amount * 100 };
    // console.log(data, "Hello");
    const toastId = toast.loading(`processing order...`);
    if (localStorage.getItem("token")) {
      try {
        const response = await axios.post(
          `https://gadgets-backend.onrender.com/api/v1/payment/initialize`,
          data,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // console.log(response.data.data.data);
        toast.dismiss(toastId);
        const url = response.data.data.data.authorization_url;
        toast.loading(`Payment page loading`);
        window.location.href = url;
        return;
      } catch (error) {
        toast.dismiss(toastId);
        console.log(error);
        toast.error(error.response?.data?.message || `Login to purchase!`);
        return;
      }
    }
    toast.dismiss(toastId);
    toast.error(`Login to purchase.`);
    return;
  };

  useEffect(() => {
    document.title = `igadgets - ${state.appCart.length} items in cart`;
    localStorage.setItem("cart", JSON.stringify(state.appCart));
    const getTotalAmount = () => {
      let count = 0;
      JSON.parse(localStorage.getItem("cart"))
        ?.map((el) => {
          el.totalPrice = el.price * el.quantity;
          return el.totalPrice;
        })
        ?.forEach((el) => {
          count += el;
        });
      return count;
    };
    setAmount(getTotalAmount());
    checkQueryAndVerifyTrx();
  }, [state, window.location.href]);

  return (
    <>
      <Toaster />
      <Header />

      {/* Cart section */}
      <section className="cart-section">
        <p className="cart-title">
          {JSON.parse(localStorage.getItem("cart"))?.length || 0} Item
          {JSON.parse(localStorage.getItem("cart"))?.length > 1 && "s"}
        </p>
        {JSON.parse(localStorage.getItem("cart"))?.length > 0 && (
          <div className="cart-section-titles">
            <div className="cart-product-image-title cart-title">Product</div>
            <div className="cart-product-name-title cart-title">
              Description
            </div>
            <div className="cart-product-quantity-title cart-title">
              Quantity
            </div>
            <div className="cart-product-price-title cart-title">Price</div>
            <div className="cart-product-price-title cart-title">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
          </div>
        )}
        <div className="cart-section-items">
          {JSON.parse(localStorage.getItem("cart"))?.length > 0
            ? JSON.parse(localStorage.getItem("cart"))?.map((item) => {
                return <CartItem {...item} key={item._id} />;
              })
            : "No items in cart..."}
        </div>

        {/* cart total and checkout button */}
        <div className="cart-section-checkout">
          <Link
            to="/"
            style={{
              color: "blue",
              fontSize: ".9rem",
              textDecoration: "underline",
            }}
          >
            Continue Shopping.
          </Link>
          {JSON.parse(localStorage.getItem("cart"))?.length > 0 && (
            <div className="checkout-container">
              <div className="cart-total"> &#8358;{amount}</div>
              <button
                type="button"
                id="checkout-btn"
                className="btn"
                onClick={checkout}
              >
                Checkout
              </button>
            </div>
          )}
        </div>

        {/* suggestions */}
        <div className="suggestions">
          <p className="suggestion-title" style={{ fontWeight: "600" }}>
            You Might Like These
          </p>
          {productsFetching ? (
            <div className="loader" key={1}>
              {[1, 2, 3].map((item) => {
                return (
                  <>
                    <div className="loader-item" key={item}></div>
                  </>
                );
              })}
            </div>
          ) : products.length > 0 ? (
            <div className="products">
              {products.map((item) => {
                item.tag = "Similar";
                return (
                  <Link to={`/product/${item._id}`} key={item.id}>
                    <Product {...item} />
                  </Link>
                );
              })}
            </div>
          ) : (
            <p>No products found...</p>
          )}
        </div>
      </section>

      {/* footer */}
      <Footer />
    </>
  );
};

export default Cart;
