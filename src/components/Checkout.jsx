import { useContext, useState } from "react";
import Modal from "./common/Modal";
import CartContext from "../store/CartContext";
import Button from "./common/Button";
import Input from "./common/Input";
import { currencyFormatting } from "../utils/formatting";
import { calculateCartTotal } from "../utils/calculateCartTotal";

const INITIAL_FORM_DATA = {
  fullName: {
    value: "",
    hasBeenEdited: false,
  },
  email: {
    value: "",
    hasBeenEdited: false,
  },
  street: {
    value: "",
    hasBeenEdited: false,
  },
  postalCode: {
    value: "",
    hasBeenEdited: false,
  },
  city: {
    value: "",
    hasBeenEdited: false,
  },
};

const Checkout = ({ open, onClose, onSubmit }) => {
  const { items } = useContext(CartContext);
  const cartTotal = calculateCartTotal(items);

  const handleSubmit = (e) => {
    e.preventDefault();
    //TODO - VALIDATION
    const orderInfo = items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    }));
    onSubmit(formData, orderInfo);
  };

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const handleInputChange = (identifier, val) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [identifier]: { value: val, hasBeenEdited: true },
      };
    });
  };

  return (
    <Modal open={open}>
      <h2>Checkout</h2>
      <p>Total Amount {currencyFormatting.format(cartTotal)}</p>
      <form onSubmit={handleSubmit} className="control">
        <Input
          id="fullName"
          label="Full Name"
          type="text"
          onInputChange={handleInputChange}
        />
        <Input
          id="email"
          label="E-Mail Address"
          type="email"
          onInputChange={handleInputChange}
        />
        <Input
          id="street"
          label="Street"
          type="text"
          onInputChange={handleInputChange}
        />
        <div className="control-row">
          <Input
            id="postalCode"
            label="Postal Code"
            type="text"
            onInputChange={handleInputChange}
          />
          <Input
            id="city"
            label="City"
            type="text"
            onInputChange={handleInputChange}
          />
        </div>

        <p className="modal-actions">
          <Button type="button" textOnly onClick={onClose}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
};

export default Checkout;
