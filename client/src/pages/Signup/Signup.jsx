import React, { useState, useContext } from "react";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import auth from "../../auth";
import { cartContext } from "../../App";

const Signup = () => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });
  const navigate = useNavigate();

  const { dispatch } = useContext(cartContext);

  const handleOnChange = e => {
    setUser(prevUser => {
      return { ...prevUser, [e.target.name]: e.target.value };
    });
  };

  const handleOnSubmit = e => {
    e.preventDefault();
    // signup user
    auth(user, "signup", setUser, navigate, dispatch);
  };
  return (
    <>
      <Toaster />
      <form
        action="#"
        method="post"
        className="signup-form"
        onSubmit={e => handleOnSubmit(e)}
      >
        <p id="signup-text">Signup</p>
        <div className="fname-div">
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="firstname"
            required
            value={user.firstname}
            onChange={e => handleOnChange(e)}
          />
        </div>
        <div className="lname-div">
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="lastname"
            value={user.lastname}
            onChange={e => handleOnChange(e)}
          />
        </div>
        <div className="email-div">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={user.email}
            onChange={e => handleOnChange(e)}
            required
          />
        </div>
        <div className="password-div">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={user.password}
            onChange={e => handleOnChange(e)}
            required
          />
        </div>
        <div className="password-confirm-div">
          <input
            type="password"
            name="passwordConfirm"
            id="password-confirm"
            placeholder="Confirm Password"
            value={user.passwordConfirm}
            onChange={e => handleOnChange(e)}
            required
          />
        </div>

        <div className="submit-btn-div">
          <button type="submit" className="btn">
            Signup
          </button>
        </div>

        <div className="auth-text">
          Have an account?
          <Link
            to={`/login`}
            style={{ textDecoration: "underline", color: "blue" }}
          >
            Login
          </Link>
        </div>
      </form>
    </>
  );
};

export default Signup;
