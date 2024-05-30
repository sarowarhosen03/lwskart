export const appInitialState = {
  wishCount: 0,
  cartCount: 0,
};

export const {
  ADD_TO_CART,
  TOGGLE_WISH,
  REMOVE_FROM_CART,
} = {
  ADD_TO_CART: "Add to cart",
  TOGGLE_WISH: "TOGGLE_WISH",
  REMOVE_FROM_CART: "Remove from cart",
};

export default function appReducer(state, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartCount: state.cartCount + action.payload,
      };
    case TOGGLE_WISH:
      return {
        ...state,
        wishCount: state.wishCount + action.payload,
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartCount: state.cartCount - action.payload,
      };



    default:
      return state;
  }
}
