import { useContext, useState, useCallback } from "react";
import Modal from "./common/Modal";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import Button from "./common/Button";
import Input from "./common/Input";
import { currencyFormatting } from "../utils/formatting";
import { calculateCartTotal } from "../utils/calculateCartTotal";

const INITIAL_FORM_DATA = {
  name: {
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
  "postal-code": {
    value: "",
    hasBeenEdited: false,
  },
  city: {
    value: "",
    hasBeenEdited: false,
  },
};

const Checkout = () => {
  const { items, clearCart } = useContext(CartContext);
  const { userProgress, hideModal, showModal, PROGRESS_OPTIONS } =
    useContext(UserProgressContext);
  const cartTotal = calculateCartTotal(items);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const handleSubmit = async (e) => {
    e.preventDefault();
    showModal(PROGRESS_OPTIONS["placing-order"]);
    //TODO - CUSTOM VALIDATION
    const orderInfo = items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    }));

    let customerInfo = {};

    for (const [key, val] of Object.entries(formData)) {
      customerInfo = { ...customerInfo, [key]: val.value };
    }

    const payload = {
      order: {
        customer: customerInfo,
        items: orderInfo,
      },
    };

    const response = await fetch("http://localhost:3000/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      showModal(PROGRESS_OPTIONS.final);
      clearCart()
      setFormData(INITIAL_FORM_DATA)
    } else {
      showModal(PROGRESS_OPTIONS.error);
    }
  };

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
          id="name"
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
            id="postal-code"
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
