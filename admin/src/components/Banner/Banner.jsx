import "./banner.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AppContext } from "../../App";
import { useContext } from "react";

const Banner = () => {
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  // logout function
  async function logout() {
    const toastId = toast.loading(`logging out...`);
    try {
      const response = await axios.get(
        `https://gadgets-backend.onrender.com/api/v1/user/logout`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.dismiss(toastId);
      console.log(response.data);
      localStorage.removeItem("token");
      dispatch({ type: "logout_admin" });
      localStorage.removeItem("loggedIn");

      // change location
      navigate(`/`);
    } catch (error) {
      toast.dismiss(toastId);
      console.log(error.response.data);
      toast.error(error.response?.data?.message);
      return;
    }
  }

  return (
    <>
      <Toaster />
      <section className="banner">
        {/* logo */}
        <p className="logo">Logo</p>

        {/* banner links */}
        <ul className="banner-links">
          <li>
            <Link
              to={`/inventory`}
              style={{
                display: "flex",
                gap: ".3rem",
                color: "var(--black)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.9}
                stroke="currentColor"
                className="size-6"
                style={{ width: "1.3rem" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              Inventory
            </Link>
          </li>
          <li>
            <Link
              to={`/add`}
              style={{
                display: "flex",
                gap: ".3rem",
                color: "var(--black)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.9}
                stroke="currentColor"
                className="size-6"
                style={{ width: "1.3rem" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add Product
            </Link>
          </li>
          <li>
            <Link
              to={`/orders`}
              style={{
                display: "flex",
                gap: ".3rem",
                color: "var(--black)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.9}
                stroke="currentColor"
                className="size-6"
                style={{ width: "1.3rem" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Orders
            </Link>
          </li>
        </ul>

        {/* logout */}
        <p
          className="logout"
          onClick={() => logout()}
          style={{
            display: "flex",
            gap: ".3rem",
            color: "whitesmoke",
            background: "rgb(247, 36, 36)",
            width: "max-content",
            padding: ".2rem .4rem",
            borderRadius: ".2rem",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.9}
            stroke="currentColor"
            className="size-6"
            style={{ width: "1.3rem" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
            />
          </svg>
          Logout
        </p>
      </section>
    </>
  );
};

export default Banner;
