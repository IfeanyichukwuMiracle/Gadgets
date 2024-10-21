import { useEffect, useState } from "react";
import "./form.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";

const Form = ({ formType }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    image: "",
  });

  // on input change
  function onInputChange(e) {
    setProduct((prevProduct) => ({
      ...prevProduct,
      [e.target.name]: e.target.value,
    }));
  }

  // submit from
  async function onFormSubmit(e) {
    e.preventDefault();
    // form data
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    // add products
    if (formType === "add") {
      try {
        await axios.post(
          `https://gadgets-backend.onrender.com/api/v1/product/create`,
          data,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": `multipart/form-data`,
            },
          }
        );
        toast.success(`Product added!`);
        setProduct({
          name: "",
          description: "",
          price: "",
          quantity: "",
          image: "",
        });
      } catch (error) {
        console.log(error.response);
        toast.error(`Error adding product!`);
        setProduct({
          name: "",
          description: "",
          price: "",
          quantity: "",
          image: "",
        });
        return;
      }
      return;
    }

    // edit product
    if (formType === "edit") {
      try {
        const res = await axios.patch(
          `https://gadgets-backend.onrender.com/api/v1/product/${productId}`,
          data,
          {
            withCredentials: true,
            headers: {
              "Content-Type": `multipart/form-data`,
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(res.data);
        toast.success(`Product edited!`);
        setProduct({
          name: "",
          description: "",
          price: "",
          quantity: "",
          image: "",
        });
      } catch (error) {
        console.log(error.response);
        toast.error(`Error editing product!`);
        setProduct({
          name: "",
          description: "",
          price: "",
          quantity: "",
          image: "",
        });
        return;
      }
      return;
    }
  }

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get(
          `https://gadgets-backend.onrender.com/api/v1/product/${productId}`,
          {
            withCredentials: true,
          }
        );
        console.log(res.data);
        setProduct({ ...res.data.data, image: "" });
      } catch (err) {
        console.log(err);
        return;
      }
    }
    if (productId) fetchProduct();
  }, [productId]);
  return (
    <>
      <Toaster />
      <section className="form">
        <p className="form-title">Form Type</p>

        {/* form */}
        <form
          method="post"
          onSubmit={(e) => onFormSubmit(e)}
          encType="multipart/form-data"
        >
          <div className="name">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Product Name"
              value={product.name}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div className="file">
            <label
              htmlFor="image"
              style={{
                background: "var(--black)",
                color: "whitesmoke",
                cursor: "pointer",
                padding: ".3rem",
                borderRadius: ".2rem",
                fontSize: ".75rem",
                fontWeight: "500",
              }}
            >
              Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              value={product.image}
              onChange={(e) => onInputChange(e)}
              style={{ display: "none" }}
            />
          </div>
          <div className="category">
            <select name="category" id="category" required>
              {product?.category && (
                <option value={product.category}>{product.category}</option>
              )}
              <option value="phone">Phone</option>
              <option value="laptop">Laptop</option>
              <option value="headset">Headset</option>
              <option value="tablet">Tablet</option>
            </select>
          </div>
          <div className="desc">
            <textarea
              name="description"
              id="description"
              placeholder="Product Description"
              rows={6}
              value={product.description}
              onChange={(e) => onInputChange(e)}
              required
            ></textarea>
          </div>
          <div className="price">
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Product Price"
              min={0}
              value={product.price}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div className="quantity">
            <input
              type="number"
              name="quantity"
              id="quantity"
              placeholder="Product Quantity"
              value={product.quantity}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div id="submit-btn">
            <button type="submit">Add Product</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Form;
