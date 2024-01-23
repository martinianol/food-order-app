import { useContext, useEffect } from "react";

import Modal from "./common/Modal";
import UserProgressContext from "../store/UserProgressContext";

const Final = ({ status }) => {
  const { userProgress, hideModal } = useContext(UserProgressContext);

  useEffect(() => {
    if (status === "success") {
      setTimeout(() => {
        hideModal();
      }, 2000);
    }
  }, [status]);

  return (
    <Modal open={userProgress === "final"}>
      <h2>{status}</h2>
    </Modal>
  );
};

export default Final;
