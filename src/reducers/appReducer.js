export const appInitialState = {

  wishList: [],
  cartList: [],
};

export const {
  ADD_TO_CART,
  TOGGLE_WISH_LIST,
  LOAD_WISH_LIST,
  LOAD_CART_LIST,
} = {
  ADD_TO_CART: "ADD_TO_CART",
  TOGGLE_WISH_LIST: "TOGGLE_WISH_LIST",
  LOAD_WISH_LIST: "LOAD_WISH_LIST",
  LOAD_CART_LIST: "LOAD_CART_LIST",
};

export default function appReducer(state, action) {
  switch (action.type) {
    case ADD_TO_CART:
      {
        const productId = action.payload;
        const product = state.cartList.find((cart) => cart === productId);
        if (!product) {
          return {
            ...state,
            cartList: [...state.cartList, productId],
          };
        }
        return state;
      }

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
    case LOAD_CART_LIST:
      return {
        ...state,
        cartList: action.payload,
      };

    default:
      return state;
  }
}
