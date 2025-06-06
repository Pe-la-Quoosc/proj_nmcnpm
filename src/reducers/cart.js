const cartReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_CART":
      return action.payload;
    case "UPDATE_QUANTITY":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + action.payload.amount }
          : item
      );
    case "DELETE_ITEM":
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
};

export default cartReducer;