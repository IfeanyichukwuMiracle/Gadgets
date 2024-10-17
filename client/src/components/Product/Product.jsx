import "./product.css";

const Product = ({ tag, image, name, price }) => {
  return (
    <section className="product-card">
      <div className="product-tag">{tag}</div>
      <img src={image} alt={name} style={{ display: "block", width: "100%" }} />
      <div className="product-card-details">
        <p className="product-name">{name}</p>
        <p className="product-price">&#8358;{price}</p>
      </div>
    </section>
  );
};

export default Product;
