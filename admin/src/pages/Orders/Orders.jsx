import { Menu } from "../../components/Menu";
import { Banner } from "../../components/Banner";
import axios from "axios";
import "../Inventory/inventory.css";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [page, setPage] = useState(1);

  // get products
  async function getOrders(currentPage) {
    try {
      const response = await axios.get(
        `https://gadgets-backend.onrender.com/api/v1/order?page=${currentPage}&limit=${10}`,
        {
          withCredentials: true,
        }
      );
      setOrders(response.data.data);
    } catch (err) {
      console.log(err);
      return;
    }
  }
  async function getAllOrders() {
    try {
      const response = await axios.get(
        `https://gadgets-backend.onrender.com/api/v1/order`,
        {
          withCredentials: true,
        }
      );
      // console.log(response.data.data);
      setAllOrders(response.data.data);
    } catch (err) {
      console.log(err);
      return;
    }
  }

  // next and previous page.
  function next() {
    if (page < allOrders.length / 10) {
      setPage((prevPage) => prevPage + 1);
    }
  }
  function prev() {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  }

  // delete product
  async function deleteOrder(id) {
    try {
      await axios.delete(
        `https://gadgets-backend.onrender.com/api/v1/order/${id}`,
        {
          withCredentials: true,
        }
      );
      toast.success(`Order fulfilled!`);
      window.location.reload();
    } catch (err) {
      console.log(err);
      toast.error(`Deletion Error!`);
      return;
    }
  }

  useEffect(() => {
    getOrders(page);
    getAllOrders();
  }, [page]);

  return (
    <>
      <Toaster />

      {/* menu */}
      <Menu />

      <section className="inventory-container">
        <Banner />
        <div className="inventory-info">
          <p className="inventory-title">Orders</p>

          {/* products in stock */}
          <section className="stock">
            {orders.length > 0 && (
              <div className="stock-title">
                <p className="stock-title-image">Image</p>
                <p className="stock-title-name">Name</p>
                <p className="stock-title-price">Price</p>
                <p className="stock-title-desc">Customer</p>
                <p>Date</p>
                <p className="stock-title-quantity">Qty</p>
                <p> &nbsp;</p>
              </div>
            )}
            {orders.length > 0 ? (
              orders.map((order) => {
                return (
                  <div className="stock-item" key={order._id}>
                    <div className="stock-item-image">
                      <img
                        src={order.productId.image}
                        alt={order.productId.name}
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div className="stock-item-name">
                      <p>{order.productId.name}</p>
                    </div>
                    <div className="stock-item-price">
                      <p>&#8358;{order.productId.price}</p>
                    </div>
                    <div className="stock-item-desc">
                      <p style={{ fontWeight: "700" }}>{order.userId.email}</p>
                    </div>
                    <div style={{ fontSize: ".8rem", fontWeight: "500" }}>
                      {new Date(order.createdAt).toLocaleString()}
                    </div>
                    <div className="stock-item-quantity">
                      <p>{order.quantity}</p>
                    </div>

                    <div>
                      <button
                        type="button"
                        title="delete"
                        style={{
                          background: "none",
                          padding: "0",
                          border: "none",
                          cursor: "pointer",
                        }}
                        onClick={() => deleteOrder(order._id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
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
                    </div>
                  </div>
                );
              })
            ) : (
              <p style={{ padding: ".5rem 0", fontSize: ".95rem" }}>
                No orders yet...
              </p>
            )}
          </section>
          {/* next & previous button */}
          {orders.length > 0 && (
            <section className="btns" style={{ display: "flex", gap: ".3rem" }}>
              <button type="button" id="btn" onClick={prev}>
                Prev
              </button>
              <button type="button" id="btn" onClick={next}>
                Next
              </button>
            </section>
          )}
        </div>
      </section>
    </>
  );
};

export default Orders;
