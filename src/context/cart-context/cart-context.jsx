import { createContext, useContext, useReducer } from 'react';

const initial = {
  cart: {},
  total: 0,
  totalItems: 0,
  showPopup: false,
  paymentMethod: null,
};

const CartContext = createContext(initial);

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { id, name, price, imageLink } = action.payload;
      // console.log(action.payload);

      const existingItem = state.cart[id];
      const quantity = existingItem ? existingItem.quantity + 1 : 1;
      const cart = {
        ...state.cart,
        [id]: { id, name, price, imageLink, quantity },
      };
      // console.log(cart);

      return {
        ...state,
        cart,
        total: state.total + price,
        totalItems: state.totalItems + 1,
      };
    }
    case 'REMOVE_FROM_CART': {
      const id = action.payload;
      const { [id]: value, ...newCart } = state.cart;
      return {
        ...state,
        cart: newCart,
        total: state.total - value.price * value.quantity,
        totalItems: state.totalItems - value.quantity,
      };
    }
    case 'INCREASE_QUANTITY': {
      const id = action.payload;
      // console.log(id);

      const item = state.cart[id];
      // console.log(item);

      const updatedCart = {
        ...state.cart,
        [id]: { ...item, quantity: item.quantity + 1 },
      };
      return {
        ...state,
        cart: updatedCart,
        total: state.total + item.price,
        totalItems: state.totalItems + 1,
      };
    }
    case 'DECREASE_QUANTITY': {
      const id = action.payload;
      const item = state.cart[id];
      const quantity = item.quantity - 1;
      if (quantity === 0) {
        const { [id]: value, ...newCart } = state.cart;
        return {
          ...state,
          cart: newCart,
          total: state.total - value.price,
          totalItems: state.totalItems - 1,
        };
      }
      const updatedCart = {
        ...state.cart,
        [id]: { ...item, quantity },
      };
      return {
        ...state,
        cart: updatedCart,
        total: state.total - item.price,
        totalItems: state.totalItems - 1,
      };
    }
    case 'ADD_MANY_TO_CART': {
      const { product, quantity } = action.payload;
      const existingItem = state.cart[product.id];
      const newQuantity = existingItem
        ? existingItem.quantity + quantity
        : quantity;
      const cart = {
        ...state.cart,
        [product.id]: { ...product, quantity: newQuantity },
      };
      // console.log(cart);
      return {
        ...state,
        cart,
        total: state.total + product.price * quantity,
        totalItems: state.totalItems + quantity,
      };
    }
    case 'TOGGLE_POPUP': {
      return {
        ...state,
        showPopup: !state.showPopup,
      };
    }

    case 'SET_PAYMENT_METHOD':
      return {
        ...state,
        paymentMethod: payload,
      };
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initial);

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const state = useContext(CartContext);

  const { cart, total, totalItems, showPopup, paymentMethod } = state;

  return { cart, total, totalItems, showPopup, paymentMethod };
};

const useCartActions = () => {
  const { dispatch } = useContext(CartContext);

  const addToCart = (product) =>
    dispatch({ type: 'ADD_TO_CART', payload: product });
  const addManyToCart = (product, quantity) =>
    dispatch({ type: 'ADD_MANY_TO_CART', payload: { product, quantity } });
  const removeFromCart = (id) =>
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  const increaseQuantity = (id) =>
    dispatch({ type: 'INCREASE_QUANTITY', payload: id });
  const decreaseQuantity = (id) =>
    dispatch({ type: 'DECREASE_QUANTITY', payload: id });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });
  const togglePopup = () => dispatch({ type: 'TOGGLE_POPUP' });

  const setPaymentMethod = (paymentMethod) => {
    dispatch({ type: 'SET_PAYMENT_METHOD', payload: paymentMethod });
  };
  return {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    togglePopup,
    addManyToCart,
    setPaymentMethod,
  };
};

export { useCartActions, useCart, CartProvider };
