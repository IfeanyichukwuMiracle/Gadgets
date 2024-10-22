import toast from "react-hot-toast";
import axios from "axios";

async function auth(data, type, setUser, navigate, dispatch) {
  // send user details
  try {
    const toastId = toast.loading(`${type} loading...`);
    const response = await axios.post(
      `https://gadgets-backend.onrender.com/api/v1/user/${type}`,
      // `http://localhost:8080/api/v1/user/${type}`,
      { ...data },
      {
        withCredentials: true,
      }
    );
    toast.dismiss(toastId);
    // console.log(response.data);
    if (type === "signup") {
      //
      localStorage.setItem("token", response.data.token);
      //
      toast.success("Signup successful!");
      dispatch({ type: "change_loggedin_state" });
    }
    if (type === "login") {
      //
      localStorage.setItem("token", response.data.token);
      //
      toast.success("Login successful!");
      dispatch({ type: "change_loggedin_state" });
    }
    setUser({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      passwordConfirm: "",
    });
    setTimeout(() => navigate("/"), 1000);
  } catch (error) {
    if (type === "signup") {
      console.log(error);
      if (error.response?.data?.error?.code === 11000) {
        toast.error(`Email already exists! Login`);
        setUser({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          passwordConfirm: "",
        });
        return;
      }
      toast.error(error.response?.data?.message);
      return;
    }
    console.log(error);
    toast.error(
      error.response?.data?.message ||
        "Login failed! Check connection and try again."
    );
    return;
  }
}

export default auth;
