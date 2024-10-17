import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import auth from "../../auth";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { cartContext } from "../../App";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: ""
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
    // login user
    auth(user, "login", setUser, navigate, dispatch);
  };
  return (
    <>
      <Toaster />
      <form
        action="#"
        method="post"
        className="login-form"
        onSubmit={e => handleOnSubmit(e)}
      >
        <p id="login-text">Login</p>
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

        {/* forgot password */}
        <div className="auth-text">
          <a href="#" style={{ textDecoration: "underline" }}>
            forgot password?
          </a>
        </div>

        <div className="submit-btn-div">
          <button type="submit" className="btn">
            Login
          </button>
        </div>

        <div className="auth-text">
          Don't have an account?{" "}
          <Link
            to={`/signup`}
            style={{ textDecoration: "underline", color: "blue" }}
          >
            Signup
          </Link>
        </div>
      </form>
    </>
  );
};

export default Login;
