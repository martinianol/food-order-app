import { useContext } from "react";
import Modal from "./common/Modal";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";
import Button from "./common/Button";
import { currencyFormatting } from "../utils/formatting";
import { calculateCartTotal } from "../utils/calculateCartTotal";

const Cart = () => {
  const { items, addItem, removeItem } = useContext(CartContext);
  const { userProgress, showCheckout, hideModal } =
    useContext(UserProgressContext);
  const cartTotal = calculateCartTotal(items);

  const handleGoToCheckout = () => {
    showCheckout();
  };

  return (
    <Modal open={userProgress === "cart"} className="cart">
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
        <Button textOnly onClick={hideModal}>
          Close
        </Button>
        {items.length > 0 && (
          <Button onClick={handleGoToCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
};

export default Cart;
