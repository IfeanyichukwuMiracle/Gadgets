import { Inventory } from "./pages/Inventory";
import { Orders } from "./pages/Orders";
import { Product } from "./pages/Product";
import { Add } from "./pages/Add";
import { Edit } from "./pages/Edit";
import { Login } from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useReducer, useEffect, createContext } from "react";
import { Auth } from "./components/Auth";

const reducer = (state, action) => {
  if (action.type === "login_admin") {
    return { ...state, loggedIn: true };
  }
  if (action.type === "logout_admin") {
    return { ...state, loggedIn: false };
  }

  throw new Error(`No such action`);
};

const initialState = {
  loggedIn:
    localStorage.getItem("loggedIn") === "" ||
    localStorage.getItem("loggedIn") === "false" ||
    localStorage.getItem("loggedIn") === null
      ? false
      : true,
};

export const AppContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("loggedIn", state.loggedIn);
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/inventory"
            element={state.loggedIn ? <Inventory /> : <Auth />}
          />
          <Route
            path="/orders"
            element={state.loggedIn ? <Orders /> : <Auth />}
          />
          <Route
            path={`/product/:productId`}
            element={state.loggedIn ? <Product /> : <Auth />}
          />
          <Route path="/add" element={state.loggedIn ? <Add /> : <Auth />} />
          <Route
            path={`/edit/:productId`}
            element={state.loggedIn ? <Edit /> : <Auth />}
          />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
