import { useContext, useState } from "react";
import useHttp from "../hooks/useHttp";
import Modal from "./common/Modal";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import Button from "./common/Button";
import Input from "./common/Input";
import Error from "./Error";
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

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

const Checkout = () => {
  const { items, clearCart } = useContext(CartContext);
  const { userProgress, hideModal } = useContext(UserProgressContext);
  const cartTotal = calculateCartTotal(items);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //TODO - CUSTOM VALIDATION
    const orderInfo = items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    }));

    let customerInfo = {};

    for (const [key, val] of Object.entries(formData)) {
      customerInfo = { ...customerInfo, [key]: val.value };
    }

    await sendRequest({
      order: {
        customer: customerInfo,
        items: orderInfo,
      },
    });
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

  const handleFinish = () => {
    clearData()
    clearCart();
    //setFormData(INITIAL_FORM_DATA);
    hideModal();
  };

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleCloseCheckout}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending Order Data...</span>;
  }

  if (data && !error) {
    actions = (
      <Button type="button" onClick={handleCloseCheckout}>
        Okay
      </Button>
    );
    return (
      <Modal open={userProgress === "checkout"} onClose={handleFinish}>
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p className="modal-actions">{actions}</p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgress === "checkout"} onClose={handleCloseCheckout}>
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

        {error && <Error title="Failed to submit order" message={error} />}

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
};

export default Checkout;
