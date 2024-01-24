import { useContext, useState, useCallback } from "react";
import Modal from "./common/Modal";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
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

const Checkout = ({ onSubmit }) => {
  const { items } = useContext(CartContext);
  const { userProgress, hideModal, showModal, PROGRESS_OPTIONS } =
    useContext(UserProgressContext);
  const cartTotal = calculateCartTotal(items);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //TODO - CUSTOM VALIDATION
    const orderInfo = items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    }));

    const payload = {
      customer: formData,
      order: orderInfo,
    };

    showModal(PROGRESS_OPTIONS["placing-order"])
    const response = await fetch("http://localhost:3000/orders", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      showModal(PROGRESS_OPTIONS.final)
    } else {
      showModal(PROGRESS_OPTIONS.error)
    }
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

  const handleCloseCheckout = () => {
    hideModal();
  };

  const isThisModal = userProgress === "checkout";

  return (
    <Modal
      open={isThisModal}
      onClose={isThisModal ? handleCloseCheckout : null}
    >
      <form onSubmit={handleSubmit} className="control">
        <h2>Checkout</h2>
        <p>Total Amount {currencyFormatting.format(cartTotal)}</p>
        <Input
          id="fullName"
          label="Full Name"
          type="text"
          required
          onInputChange={handleInputChange}
        />
        <Input
          id="email"
          label="E-Mail Address"
          type="email"
          required
          onInputChange={handleInputChange}
        />
        <Input
          id="street"
          label="Street"
          type="text"
          required
          onInputChange={handleInputChange}
        />
        <div className="control-row">
          <Input
            id="postalCode"
            label="Postal Code"
            type="text"
            required
            onInputChange={handleInputChange}
          />
          <Input
            id="city"
            label="City"
            type="text"
            required
            onInputChange={handleInputChange}
          />
        </div>

        <p className="modal-actions">
          <Button type="button" textOnly onClick={handleCloseCheckout}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
};

export default Checkout;
