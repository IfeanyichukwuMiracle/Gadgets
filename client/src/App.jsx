import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { ProductPage } from "./pages/Product";
import { Cart } from "./pages/Cart";
import { ProductsPage } from "./pages/Products";
import { createContext, useEffect, useReducer } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reducer from "./reducer";

export const cartContext = createContext();

const getLocalStorageData = JSON.parse(localStorage.getItem("cart")) || [];
const getLoginState = JSON.parse(localStorage.getItem("loggedIn") || false);

// default state
const initialState = {
  appCart: getLocalStorageData,
  loggedIn: getLoginState
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.appCart));
    localStorage.setItem("loggedIn", state.loggedIn);
  }, [state]);

  return (
    <cartContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </BrowserRouter>
    </cartContext.Provider>
  );
}

export default App;
