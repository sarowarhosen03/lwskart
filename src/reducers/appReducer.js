export const appInitialState = {
  cartCount: 0,
  wishList: [],
};

export const {
  ADD_TO_CART,
  TOGGLE_WISH,
  REMOVE_FROM_CART,
  TOGGLE_WISH_LIST,
  LOAD_WISH_LIST,
} = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  TOGGLE_WISH_LIST: "TOGGLE_WISH_LIST",
  LOAD_WISH_LIST: "LOAD_WISH_LIST",
};

export default function appReducer(state, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartCount: state.cartCount + action.payload,
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartCount: state.cartCount - action.payload,
      };
    case LOAD_WISH_LIST:
      return {
        ...state,
        wishList: action.payload,
      };
    case TOGGLE_WISH_LIST: {
      const productId = action.payload;
      const wishItemIndex = state.wishList.indexOf(productId);
      if (wishItemIndex >= 0) {
        // Remove item from wishList
        return {
          ...state,
          wishList: state.wishList.filter((id) => id !== productId),
        };
      } else {
        // Add item to wishList
        return {
          ...state,
          wishList: [...state.wishList, productId],
        };
      }
    }
    default:
      return state;
  }
}
