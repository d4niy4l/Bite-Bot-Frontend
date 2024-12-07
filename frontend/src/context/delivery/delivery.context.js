// const INIT_STATE = {
//   selectedOrder: null,
//   loading: true,
//   orders: [],
// };

// const DeliveryContext = createContext(INIT_STATE);

// const deliveryReducer = (state, action) => {
//   const { type, payload } = action;
//   switch (type) {
//     case 'SET_ORDERS':
//       return { ...state, orders: payload };
//     case 'SET_LOADING':
//       return { ...state, loading: payload };
//     case 'SET_SELECTED_ORDER':
//       return { ...state, selectedOrder: payload };
//     default:
//       return state;
//   }
// };

// export const DeliveryProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(deliveryReducer, INIT_STATE);

//   return (
//     <DeliveryContext.Provider value={{ ...state, dispatch }}>
//       {children}
//     </DeliveryContext.Provider>
//   );
// };
