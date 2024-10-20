import { useContext, useEffect, useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { cartContext } from "../../App";
import { Toaster } from "react-hot-toast";

const Header = () => {
  const { state, dispatch } = useContext(cartContext);
  const [loggedIn, setLoggedIn] = useState(state.loggedIn);
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState("");
  const [proceed, setProceed] = useState(false);

  // logout
  const logout = async () => {
    try {
      await axios.get(
        `https://gadgets-backend.onrender.com/api/v1/user/logout`,
        {
          withCredentials: true,
        }
      );
      toast.loading("Logging you out!");
      dispatch({ type: "logout" });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      return;
    } catch (error) {
      console.log(error);
      toast.error("You are not logged in!");
      return;
    }
  };

  useEffect(() => {
    if (localStorage.getItem("loggedIn") == "true") {
      setLoggedIn(true);
    } else if (localStorage.getItem("loggedIn") == "false") {
      setLoggedIn(false);
    }
  }, [loggedIn]);
  return (
    <>
      <Toaster />
      {/* header */}
      <header className="header">
        <p className="logo">
          <Link to={`/`} style={{ color: "var(--black)" }}>
            Logo
          </Link>
        </p>

        {/* mobile cart-items and menu */}
        <ul className="mobile-links">
          <li className="cart-link">
            <div className="cart-item-number">{state.appCart?.length}</div>
            <Link to={`/cart`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.6}
                stroke="currentColor"
                className="size-6"
                style={{ width: "1.5rem" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </Link>
          </li>
          <li>
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.6}
                stroke="currentColor"
                className="size-6"
                style={{ width: "1.5rem" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
                />
              </svg>
            </a>
          </li>
        </ul>

        <ul className="desktop-links">
          <li className="cart-link">
            <div className="cart-item-number">{state.appCart?.length}</div>
            <Link to={`/cart`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.6}
                stroke="currentColor"
                className="size-6"
                style={{ width: "1.5rem" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </Link>
          </li>
          <li>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                setModal(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.6}
                stroke="currentColor"
                className="size-6"
                style={{ width: "1.5rem" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
          </li>
          <li>
            {loggedIn ? (
              <div
                className="logout"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (state.appCart.length > 0) {
                    setProceed(true);
                    return;
                  }
                  logout();
                }}
              >
                Logout
              </div>
            ) : (
              <Link to={`/login`}>Login</Link>
            )}
          </li>
        </ul>
      </header>

      {/* Proceed modal */}
      {proceed && (
        <section className="proceed-modal-container">
          <div className="proceed-modal">
            <div
              className="cancel"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setProceed(false);
              }}
            >
              X
            </div>
            <div id="proceed-text">
              You still have <strong>{state.appCart.length}</strong> items in
              cart. Want to proceed with logout?
            </div>
            <div
              className="proceed-modal-btns"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "1.5rem 0 0",
              }}
            >
              <div
                className="proceed-logout"
                style={{
                  cursor: "pointer",
                  color: "blue",
                  fontSize: ".8rem",
                  textDecoration: "underline",
                }}
                onClick={logout}
              >
                Proceed
              </div>
              <div>
                <Link
                  to={`/cart`}
                  style={{
                    fontSize: ".8rem",
                    background: "var(--black)",
                    color: "white",
                    padding: ".2rem .2rem .3rem",
                    fontWeight: "500",
                    borderRadius: ".2rem",
                  }}
                  onClick={() => {
                    setProceed(false);
                  }}
                >
                  Go to cart
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Search modal */}
      {modal && (
        <section className="search">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!search) {
                toast.error("Enter product name!");
                return;
              }
              window.location.href = `/products?search=${search}`;
            }}
          >
            <div
              className="search-cancel"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setModal(false);
              }}
            >
              X
            </div>
            <div className="search-div">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Enter Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="search-btn-div">
              <button type="submit">Search</button>
            </div>
          </form>
        </section>
      )}
    </>
  );
};

export default Header;
