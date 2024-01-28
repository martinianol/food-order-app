import { createContext, useState } from "react";

const PROGRESS_OPTIONS = {
  cart: "cart",
  checkout: "checkout",
  final: "final",
  "placing-order": "placing-order",
  error: "error",

}

const UserProgressContext = createContext({
  progress: null, // PROGRESS_OPTIONS
  showModal: (progress) => {},
  PROGRESS_OPTIONS
});

export const UserProgressContextProvider = ({ children }) => {
  const [userProgress, setUserProgress] = useState(null);

  const showModal = (progress) => setUserProgress(progress);
  const hideModal = () => setUserProgress(null);

  const userProgressContext = {
    userProgress,
    showModal,
    hideModal,
    PROGRESS_OPTIONS
  };

  return (
    <UserProgressContext.Provider value={userProgressContext}>
      {children}
    </UserProgressContext.Provider>
  );
};

export default UserProgressContext;
