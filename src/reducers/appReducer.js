export const appInitialState = {
  isLoading: true,
  error: false,
  wishList: [],
  cartList: [],
  selectedItems: {
    selected: false,
    items: [],
  },
};

export const {
  DELETE_CART,
  UPDATE_CART,
  TOGGLE_WISH_LIST,
  LOAD_WISH_LIST,
  LOAD_RESULT,
  ON_LOADING,
  ON_ERROR,
  ADD_CART,
  SELECTE_CART,
} = {
  DELETE_CART: "DELETE_CART",
  UPDATE_CART: "UPDATE_CART",
  TOGGLE_WISH_LIST: "TOGGLE_WISH_LIST",
  LOAD_RESULT: "LOAD_RESULT",
  ON_LOADING: "ON_LOADING",
  ON_ERROR: "ON_ERROR",
  ADD_CART: "ADD_CART",
  SELECTE_CART: "SELECTE_CART",
};

export default function appReducer(state, action) {
  switch (action.type) {
    case UPDATE_CART: {
      const { productId } = action.payload;
      const product = state.cartList.find(
        (item) => item.productId === productId,
      );
      if (product) {
        return {
          ...state,
          cartList: state.cartList.map((item) =>
            item.productId === productId ? action.payload : item,
          ),
        };
      } else {
        return {
          ...state,
          cartList: [...state.cartList, action.payload],
        };
      }
    }
    case LOAD_RESULT:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        error: false,
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
    case DELETE_CART: {
      const productId = action.payload;
      return {
        ...state,
        cartList: state.cartList.filter((item) => item.productId !== productId),
      };
    }
    case ON_LOADING: {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    }
    case ON_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    case ADD_CART: {
      return {
        ...state,
        cartList: [...state.cartList, action.payload],
      };
    }
    case SELECTE_CART: {
      return {
        ...state,
        selectedItems: {
          selected: true,
          items: action.payload,
        },
      };
    }
    default:
      return state;
  }
}
