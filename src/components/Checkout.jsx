import Modal from "./common/Modal";
import Button from "./common/Button";

const Checkout = ({ open, onClose, total }) => {
  const handleSubmit = () => {
    console.log("I will submit the order");
  };
  return (
    <Modal open={open}>
      <h2>Checkout</h2>
      <p>Total Amount {total}</p>
      <p className="modal-actions">
        <Button textOnly onClick={onClose}>
          Close
        </Button>
        <Button onClick={handleSubmit}>Submit Order</Button>
      </p>
    </Modal>
  );
};

export default Checkout;
