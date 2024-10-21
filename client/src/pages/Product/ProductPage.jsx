import { useContext, useState } from "react";
import "./product.css";
import { Header } from "../../components/Header";
import { Product } from "../../components/Product";
import { cartContext } from "../../App";
import toast, { Toaster } from "react-hot-toast";

import image from "../../assets/image1 (1).jpg";
import useFetch from "../../useFetch";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Footer } from "../../components/Footer";

const ProductPage = () => {
  const [review, setReview] = useState({ review: "" });
  const { productId } = useParams();
  const { data: product, fetching: productFetching } = useFetch(
    `https://gadgets-backend.onrender.com/api/v1/product/${productId}`,
    productId
  );
  const { data: reviews, fetching: reviewsFetching } = useFetch(
    `https://gadgets-backend.onrender.com/api/v1/review/${productId}`,
    productId
  );
  const { data: products, fetching: productsFetching } = useFetch(
    `https://gadgets-backend.onrender.com/api/v1/product?category=${
      product.category || `phone`
    }&limit=3`,
    productId
  );
  const { dispatch } = useContext(cartContext);

  const handleAddToCart = () => {
    if (
      !JSON.parse(localStorage.getItem("cart")).find(
        (el) => el.id === product.id
      )
    ) {
      dispatch({ type: "add_to_cart", payload: { ...product, quantity: 1 } });
      toast.success("Item added to cart!");
      return;
    }
    toast.error("Item already in cart!");
    return;
  };

  const handleOnChange = (e) => {
    setReview((prevReview) => ({
      ...prevReview,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    sendReview();
  };

  // send review
  async function sendReview() {
    try {
      await axios.post(
        `https://gadgets-backend.onrender.com/api/v1/review/${productId}`,
        review,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success(`Review sent!`);
      setReview({ review: "" });
      window.location.reload();
      return;
    } catch (error) {
      console.log(error);
      toast.error(`Login and try again!`);
      return;
    }
  }

  return (
    <>
      <Toaster />
      <Header />
      <section className="single-product-page">
        <div className="navigation">
          <Link to="/">Home</Link> /{" "}
          {productFetching ? (
            <div className="product-link-loader"></div>
          ) : (
            <Link to={`/product/${productId}`}>{product.name || "---"}</Link>
          )}
        </div>

        {/* product information */}
        {productFetching ? (
          <section className="product-loader">
            <div className="product-loader-image"></div>
            <div className="product-loader-info">
              <div className="product-loader-info-title"></div>
              <div className="product-loader-info-desc"></div>
              <div className="product-loader-info-price"></div>
            </div>
          </section>
        ) : (
          <div className="product-info">
            <img
              src={product.image || image}
              alt={product.name}
              style={{ display: "block" }}
            />
            <div className="product-text-info">
              <p className="product-name">{product.name || "---"}</p>
              <p className="product-description">
                {product.description || "---"}
              </p>
              <p className="product-price">&#8358;{product.price || "---"}</p>
              {product.quantity <= 10 ? (
                <p className="product-quantity">
                  {product.quantity || "---"} left!
                </p>
              ) : (
                ""
              )}

              <button type="button" id="buy-btn" onClick={handleAddToCart}>
                Add To Cart
              </button>
            </div>
          </div>
        )}

        <div className="comment-section">
          <p className="comment">Reviews</p>
          <form action="#" method="post" onSubmit={(e) => handleOnSubmit(e)}>
            <div className="comment-box">
              <textarea
                name="review"
                id="comment"
                placeholder="Write a review"
                style={{
                  background: "#f5f5f5",
                  padding: ".3rem",
                  border: "none",
                }}
                rows={4}
                onChange={(e) => handleOnChange(e)}
                value={review.review}
                required
              ></textarea>
            </div>
            <div className="review-btn">
              <button
                type="submit"
                className="btn"
                style={{
                  fontSize: ".8rem",
                  border: "none",
                  padding: ".2rem",
                  margin: ".5rem 0",
                }}
              >
                Send Review
              </button>
            </div>
          </form>

          <section className="reviews-list">
            {reviewsFetching ? (
              [1, 2, 3].map((item) => {
                return <div className="reviews-loader" key={item}></div>;
              })
            ) : reviews?.length > 0 ? (
              reviews
                .map((item) => {
                  return (
                    <div className="review-container" key={item._id}>
                      <div className="review-header">
                        <div className="review-user">{`${item.userId?.firstname} ${item.userId?.lastname}`}</div>
                        <div className="review-time">{`${new Date(
                          item.createdAt
                        ).toLocaleString()}`}</div>
                      </div>
                      <div className="review">{item.review}</div>
                    </div>
                  );
                })
                .reverse()
            ) : (
              <p
                style={{
                  fontSize: "0.81rem",
                  padding: ".3rem",
                  fontWeight: "500",
                }}
              >
                Be the first to send a review.
              </p>
            )}
          </section>
        </div>

        <div className="suggestions">
          <p className="suggestion-title" style={{ fontWeight: "600" }}>
            You Might Like These
          </p>
          {productsFetching ? (
            <div className="loader">
              {[1, 2, 3].map((item) => {
                return <div className="loader-item" key={item}></div>;
              })}
            </div>
          ) : products.length === 0 ? (
            <p style={{ fontSize: ".9rem", marginTop: ".5rem" }}>
              No products found...
            </p>
          ) : (
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
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProductPage;
