import { useContext, useEffect } from "react";

import Modal from "./common/Modal";
import UserProgressContext from "../store/UserProgressContext";

const Final = () => {
  const { userProgress, hideModal, PROGRESS_OPTIONS } =
    useContext(UserProgressContext);

  useEffect(() => {
    if (userProgress === PROGRESS_OPTIONS.final) {
      setTimeout(() => {
        hideModal();
      }, 2000);
    }
  }, [userProgress]);

  const isOpen =
    userProgress === PROGRESS_OPTIONS["placing-order"] ||
    userProgress === PROGRESS_OPTIONS.error ||
    userProgress === PROGRESS_OPTIONS.final;

  return (
    <Modal open={isOpen} onClose={hideModal}>
      <h2>{status}</h2>
    </Modal>
  );
};

export default Final;
