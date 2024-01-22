import { useContext } from "react";

import Modal from "./common/Modal";
import UserProgressContext from "../store/UserProgressContext";

const Final = ({status}) => {
  const { userProgress } = useContext(UserProgressContext);
  console.log("userProgress in Final Modal", userProgress)
  return (
    <Modal open={userProgress === "final"}>
      <h2>{status}</h2>
    </Modal>
  );
};

export default Final;
