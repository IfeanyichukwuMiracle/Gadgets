import { useState, useContext } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AppContext } from "../../App";

const Login = () => {
  const { dispatch } = useContext(AppContext);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setUser((prevUser) => {
      return { ...prevUser, [e.target.name]: e.target.value };
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    // login admin
    async function loginAdmin() {
      try {
        const response = await axios.post(
          `https://gadgets-backend.onrender.com/api/v1/user/login/admin`,
          { ...user },
          { withCredentials: true }
        );
        // console.log(response.data);
        //
        localStorage.setItem("token", response.data.token);
        //
        toast.success(`Login successful!`);
        setUser({ email: "", password: "" });
        dispatch({ type: "login_admin" });

        setTimeout(() => {
          navigate(`/inventory`);
        }, 1000);
        return;
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
    loginAdmin();
  };
  return (
    <>
      <Toaster />
      <form
        action="#"
        method="post"
        className="login-form"
        onSubmit={(e) => handleOnSubmit(e)}
      >
        <p id="login-text">Login</p>
        <div className="email-div">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => handleOnChange(e)}
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
            onChange={(e) => handleOnChange(e)}
            required
          />
        </div>

        {/* forgot password */}
        <div className="auth-text">
          <a href="#" style={{ textDecoration: "underline", color: "blue" }}>
            forgot password?
          </a>
        </div>

        {/* Login button */}
        <div className="submit-btn-div">
          <button
            type="submit"
            className="btn"
            style={{
              color: "whitesmoke",
              fontWeight: "500",
              fontSize: "1rem",
              borderRadius: ".3rem",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
