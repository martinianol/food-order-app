export const calculateCartTotal = (items) =>
  items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

