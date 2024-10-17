import "./products.css";
import { Product } from "../Product";
import useFetch from "../../useFetch";
import { Link } from "react-router-dom";

const Products = () => {
  const { data: premiumProducts, fetching: premiumFetching } = useFetch(
    `http://localhost:8080/api/v1/product/premium-products`
  );
  const { data: latestProducts, fetching: latestFetching } = useFetch(
    `http://localhost:8080/api/v1/product/latest-arrivals`
  );

  return (
    <>
      <section className="products-container">
        {/* latest arrivals */}
        <div className="latest-arrivals">
          <p className="products-title">Latest Arrivals</p>
          {latestFetching ? (
            <div className="loader" key={1}>
              {[1, 2, 3].map((item) => {
                return (
                  <>
                    <div className="loader-item" key={item}></div>
                  </>
                );
              })}
            </div>
          ) : latestProducts.length > 0 ? (
            <div className="products">
              {latestProducts.map((product) => {
                product.tag = "Latest";
                return (
                  <Link to={`/product/${product._id}`} key={product._id}>
                    <Product {...product} />
                  </Link>
                );
              })}
            </div>
          ) : (
            <p style={{ fontSize: ".87rem", marginTop: ".5rem" }}>
              No Products found...
            </p>
          )}
        </div>

        {/* premium products */}
        <div className="premium-products">
          <p className="products-title">Premium Products</p>
          {premiumFetching ? (
            <div className="loader">
              {[1, 2, 3].map((item) => {
                return (
                  <>
                    <div className="loader-item" key={item}></div>
                  </>
                );
              })}
            </div>
          ) : premiumProducts.length > 0 ? (
            <div className="products">
              {premiumProducts.map((product) => {
                product.tag = "Premium";

                return (
                  <Link to={`/product/${product._id}`} key={product._id}>
                    <Product {...product} />
                  </Link>
                );
              })}
            </div>
          ) : (
            <p style={{ fontSize: ".87rem", marginTop: ".5rem" }}>
              No Products found...
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default Products;
