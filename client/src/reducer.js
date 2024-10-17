const reducer = (state, action) => {
  if (action.type === "add_to_cart") {
    return {
      ...state,
      appCart: [
        ...state.appCart,
        {
          ...action.payload,
          totalAmount: state.appCart.price * action.payload.quantity,
        },
      ],
    };
  }
  if (action.type === "decrease_product_quantity") {
    const newCartItem = state.appCart.map((product) => {
      if (product.id === action.payload.id) {
        product.quantity = action.payload.quantity;
        product.totalAmount = product.price * action.payload.quantity;
      }
      return product;
    });
    return { ...state, appCart: [...newCartItem] };
  }
  if (action.type === "increase_product_quantity") {
    const newCartItem = state.appCart.map((product) => {
      if (product.id === action.payload.id) {
        product.quantity = action.payload.quantity;
        product.totalAmount = product.price * action.payload.quantity;
      }
      return product;
    });
    return { ...state, appCart: [...newCartItem] };
  }
  if (action.type === "remove_product_from_cart") {
    const newCart = state.appCart.filter(
      (product) => product.id !== action.payload
    );
    return { ...state, appCart: [...newCart] };
  }
  if (action.type === "change_loggedin_state") {
    return { ...state, loggedIn: true };
  }
  if (action.type === "logout") {
    return { ...state, loggedIn: false, appCart: [] };
  }
  if (action.type === "order_placed") {
    return { ...state, appCart: [] };
  }

  throw new Error("No such action!");
};

export default reducer;
