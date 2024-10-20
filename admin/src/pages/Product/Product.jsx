import "./product.css";
import { Banner } from "../../components/Banner";
import { Menu } from "../../components/Menu";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import { useState } from "react";

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  // delete product
  async function deleteProduct() {
    try {
      await axios.delete(
        `https://gadgets-backend.onrender.com/api/v1/product/${productId}`,
        {
          withCredentials: true,
        }
      );
      toast.success(`Deletion successful!`);
      setTimeout(() => navigate(`/inventory`), 800);
    } catch (err) {
      console.log(err);
      toast.error(`Deletion Error!`);
      return;
    }
  }

  useEffect(() => {
    async function getProduct() {
      try {
        const response = await axios.get(
          `https://gadgets-backend.onrender.com/api/v1/product/${productId}`,
          { withCredentials: true }
        );

        setProduct(response.data.data);
      } catch (err) {
        console.log(err);
        return;
      }
    }

    getProduct();
  }, [productId]);
  return (
    <>
      <Toaster />

      {/* menu */}
      <Menu />

      <section className="product-container">
        <Banner />

        {/* product details */}
        <div className="product-details-container">
          <p className="product-details-title">Product Details</p>

          <section className="product-details">
            <div className="product-details-image">
              <img
                src={product.image}
                alt={product.name}
                style={{ display: "block" }}
              />
            </div>
            <div className="product-details-info">
              <p className="product-details-name">{product.name}</p>
              <p className="product-details-desc">{product.description}</p>
              <p className="product-details-price">&#8358;{product.price}</p>
              <p className="product-details-quantity">
                {product.quantity} left in stock!
              </p>
              <div className="product-details-btns">
                <Link to={`/edit/${productId}`}>
                  <button
                    type="button"
                    id="edit-btn"
                    style={{ cursor: "pointer" }}
                  >
                    Edit Product
                  </button>
                </Link>
                <button
                  type="button"
                  id="delete-btn"
                  style={{ cursor: "pointer" }}
                  onClick={deleteProduct}
                >
                  Delete Product
                </button>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default Product;
