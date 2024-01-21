const CartItem = ({ item }) => {
  return (
    <li className="cart-item">
      <p>
        {item.name} - {item.quantity} x {item.price}
      </p>
      <div className="cart-item-actions">
        <button>-</button>
        <span>{item.quantity}</span>
        <button>+</button>
      </div>
    </li>
  );
};

export default CartItem;
