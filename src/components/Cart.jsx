import { useContext } from "react";
import Modal from "./common/Modal";
import CartContext from "../store/CartContext";
import CartItem from "./CartItem";
import Button from "./common/Button";
import { currencyFormatting } from "../utils/formatting";

const Cart = ({ open, onClose }) => {
  const { items } = useContext(CartContext);
  const totalValue = items.reduce((accValue, item) => {
    return accValue + item.quantity * item.price;
  }, 0);

  return (
    <Modal open={open} className="cart">
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <div className="cart-total">{currencyFormatting.format(totalValue)}</div>
      <div className="modal-actions">
        <Button textOnly onClick={onClose}>Close</Button>
        <Button>Go to Checkout </Button>
      </div>
    </Modal>
  );
};

export default Cart;
