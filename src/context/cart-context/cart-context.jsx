import { createContext, useContext, useReducer } from "react";

const initial = {
  cart: [],
  total: 0,
  totalItems: 0,
  showPopup: false,
}

const CartContext = createContext(initial);

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, action.payload],
        total: state.total + action.payload.price,
        totalItems: state.totalItems + 1,
      }
    case 'REMOVE_FROM_CART':
      const item = state.cart.find((product) => product.id === action.payload);
      return {
        ...state,
        cart: state.cart.filter((product) => product.id !== action.payload),
        total: state.total - item.price * item.quantity,
        totalItems: state.totalItems - item.quantity,
      }
    case 'INCREASE_QUANTITY':
      const increaseItem = state.cart.find((product) => product.id === action.payload);
      increaseItem.quantity += 1;
      return {
        ...state,
        total: state.total + increaseItem.price,
        totalItems: state.totalItems + 1,
      }
    case 'DECREASE_QUANTITY':
      const decreaseItem = state.cart.find((product) => product.id === action.payload);
      decreaseItem.quantity -= 1;
      return {
        ...state,
        total: state.total - decreaseItem.price,
        totalItems: state.totalItems - 1,
      }
    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
        total: 0,
        totalItems: 0,
      }
    case 'TOGGLE_POPUP':
      return {
        ...state,
        showPopup: !state.showPopup,
      }
    default:
      return state;
  }
}

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initial);

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}



const useCart = () => {
  const state = useContext(CartContext);

  const { cart, total, totalItems, showPopup } = state;
  
  return { cart, total, totalItems, showPopup };
}

const useCartActions = () => {

  const { dispatch } = useContext(CartContext);

  
  const addToCart = (product) => dispatch({ type: 'ADD_TO_CART', payload: product });
  const removeFromCart = (id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  const increaseQuantity = (id) => dispatch({ type: 'INCREASE_QUANTITY', payload: id });
  const decreaseQuantity = (id) => dispatch({ type: 'DECREASE_QUANTITY', payload: id });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });
  const togglePopup = () => dispatch({ type: 'TOGGLE_POPUP' });
  return { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, togglePopup };

}

export { useCartActions, useCart, CartProvider };