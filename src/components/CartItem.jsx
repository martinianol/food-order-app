const CartItem = ({ item, onDecreaseQuantity, onIncreaseQuantity }) => {
  return (
    <li className="cart-item">
      <p>
        {item.name} - {item.quantity} x {item.price}
      </p>
      <p className="cart-item-actions">
        <button onClick={onDecreaseQuantity}>-</button>
        <span>{item.quantity}</span>
        <button onClick={onIncreaseQuantity}>+</button>
      </p>
    </li>
  );
};

export default CartItem;
