import { useContext } from "react";
import Modal from "./common/Modal";
import CartContext from "../store/CartContext";
import CartItem from "./CartItem";
import Button from "./common/Button";
import { currencyFormatting } from "../utils/formatting";

const Cart = ({ open, onClose, onGoToCheckout }) => {
  const { items, addItem, removeItem } = useContext(CartContext);
  const cartTotal = items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

  return (
    <Modal open={open} className="cart">
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onIncreaseQuantity={() => addItem(item)}
            onDecreaseQuantity={() => removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatting.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={onClose}>
          Close
        </Button>
        <Button onClick={onGoToCheckout}>Go to Checkout</Button>
      </p>
    </Modal>
  );
};

export default Cart;
