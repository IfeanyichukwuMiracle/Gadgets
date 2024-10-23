import { Banner } from "../../components/Banner";
import "./inventory.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Menu } from "../../components/Menu";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [page, setPage] = useState(1);

  // get products
  async function getProducts(currentPage) {
    try {
      const response = await axios.get(
        `https://gadgets-backend.onrender.com/api/v1/product?page=${currentPage}&limit=${10}`,
        {
          withCredentials: true,
        }
      );
      setProducts(response.data.data);
    } catch (err) {
      console.log(err);
      return;
    }
  }
  async function getAllProducts() {
    try {
      const response = await axios.get(
        `https://gadgets-backend.onrender.com/api/v1/product`,
        {
          withCredentials: true,
        }
      );
      setAllProducts(response.data.data);
    } catch (err) {
      console.log(err);
      return;
    }
  }

  // next and previous page.
  function next() {
    if (page < allProducts.length / 10) {
      setPage((prevPage) => prevPage + 1);
    }
  }
  function prev() {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  }

  // delete product
  async function deleteProduct(id) {
    try {
      await axios.delete(
        `https://gadgets-backend.onrender.com/api/v1/product/${id}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success(`Product Deleted!`);

      window.location.reload();
    } catch (err) {
      console.log(err);
      toast.error(`Deletion Error!`);
      return;
    }
  }

  useEffect(() => {
    getProducts(page);
    getAllProducts();
    document.title = `igadgets - ${allProducts.length} in Inventory`;
  }, [page]);
  return (
    <>
      <Toaster />

      {/* menu */}
      <Menu />

      <section className="inventory-container">
        <Banner />
        <div className="inventory-info">
          <p className="inventory-title">Inventory / Stock</p>

          {/* products in stock */}
          <section className="stock">
            <div className="stock-title">
              <p className="stock-title-image">Image</p>
              <p className="stock-title-name">Name</p>
              <p className="stock-title-price">Price</p>
              <p className="stock-title-desc">Description</p>
              <p className="stock-title-quantity">Quantity</p>
              <p> &nbsp;</p>
              <p> &nbsp;</p>
            </div>
            {products.length > 0 ? (
              products.map((product) => {
                return (
                  <div className="stock-item" key={product._id}>
                    <div className="stock-item-image">
                      <Link to={`/product/${product._id}`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{ width: "100%" }}
                        />
                      </Link>
                    </div>
                    <div className="stock-item-name">
                      <Link
                        to={`/product/${product._id}`}
                        style={{ color: "var(--black)" }}
                      >
                        <p>{product.name}</p>
                      </Link>
                    </div>
                    <div className="stock-item-price">
                      <p>&#8358;{product.price}</p>
                    </div>
                    <div className="stock-item-desc">
                      <p>{product.description.substring(0, 25)}...</p>
                    </div>
                    <div className="stock-item-quantity">
                      <p>{product.quantity}</p>
                    </div>
                    <div>
                      <Link to={`/edit/${product._id}`}>
                        <button
                          type="button"
                          title="edit"
                          style={{
                            background: "none",
                            padding: "0",
                            border: "none",
                            cursor: "pointer",
                          }}
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
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                            />
                          </svg>
                        </button>
                      </Link>
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
                        onClick={() => deleteProduct(product._id)}
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
              <p>No products in inventory.</p>
            )}
          </section>
          {/* next & previous button */}
          <section className="btns" style={{ display: "flex", gap: ".3rem" }}>
            <button type="button" id="btn" onClick={prev}>
              Prev
            </button>
            <button type="button" id="btn" onClick={next}>
              Next
            </button>
          </section>
        </div>
      </section>
    </>
  );
};

export default Inventory;
