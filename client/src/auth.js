import toast from "react-hot-toast";
import axios from "axios";

async function auth(data, type, setUser, navigate, dispatch) {
  // send user details
  try {
    const response = await axios.post(
      `http://localhost:8080/api/v1/user/${type}`,
      { ...data },
      {
        withCredentials: true
      }
    );
    console.log(response.data);
    if (type === "signup") {
      toast.success("Signup successful!");
      dispatch({ type: "change_loggedin_state" });
    }
    if (type === "login") {
      toast.success("Login successful!");
      dispatch({ type: "change_loggedin_state" });
    }
    setUser({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      passwordConfirm: ""
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
          passwordConfirm: ""
        });
        return;
      }
      toast.error(error.response?.data?.message);
      return;
    }
    toast.error(
      error.response?.data?.message ||
        "Login failed! Check connection and try again."
    );
    return;
  }
}

export default auth;
