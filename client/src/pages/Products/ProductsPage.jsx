import { useEffect, useState } from "react";
import "./products.css";
import { Header } from "../../components/Header";
import axios from "axios";

import { Link } from "react-router-dom";
import { Footer } from "../../components/Footer";

const ProductsPage = () => {
  let obj = {};
  const [products, setProducts] = useState([]);
  const [fetching, setFetching] = useState(false);

  function checkQuery() {
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
  }

  async function fetchProduct(filterBy) {
    setFetching(true);
    try {
      const response = await axios.get(
        `https://gadgets-backend.onrender.com/api/v1/product`
      );
      let productList = response.data.data.filter((el) => {
        if (
          el.name.toLowerCase().includes(filterBy.toLowerCase()) ||
          el.category?.toLowerCase().includes(filterBy.toLowerCase())
        ) {
          return el;
        }
      });
      setProducts((prevProducts) => [...prevProducts, ...productList]);
      setFetching(false);
    } catch (error) {
      console.log(error);
      setFetching(false);
    }
  }

  useEffect(() => {
    checkQuery();
    fetchProduct(obj.search);
    document.title = `igadgets - Search: ${obj.search}`;
  }, [window.location.href]);

  return (
    <>
      <Header />
      <section className="results-section">
        <div className="results">{products.length} Results</div>
        {fetching ? (
          [1, 2, 3, 4].map((item) => {
            return (
              <div className="product-search-loader" key={item}>
                <div className="product-search-loader-image"></div>
                <div className="product-search-loader-info">
                  <div className="product-search-loader-info-title"></div>
                  <div className="product-search-loader-info-desc"></div>
                </div>
              </div>
            );
          })
        ) : products.length > 0 ? (
          products.map((product) => {
            return (
              <div key={product._id} className="result">
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.image}
                    alt=""
                    style={{ width: "10rem", display: "block" }}
                  />
                </Link>
                <div className="result-info">
                  <Link
                    to={`/product/${product._id}`}
                    style={{ color: "var(--black)" }}
                  >
                    <p className="result-name">{product.name}</p>
                  </Link>
                  <p className="result-description">
                    {product.description.substring(0, 50)} ...
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p style={{ fontSize: ".9rem" }}>No results.</p>
        )}
      </section>
      <Footer />
    </>
  );
};

export default ProductsPage;
