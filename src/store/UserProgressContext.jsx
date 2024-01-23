import { createContext, useState } from "react";

const UserProgressContext = createContext({
  progress: null, // "cart" "checkout" "final"
  showCart: () => {},
  hideModal: () => {},
});

export const UserProgressContextProvider = ({ children }) => {
  const [userProgress, setUserProgress] = useState(null);

  const showCart = () => setUserProgress("cart");
  const hideModal = () => setUserProgress(null);
  const showCheckout = () => setUserProgress("checkout");
  const showFinal = () => setUserProgress("final");

  const userProgressContext = {
    userProgress,
    hideModal,
    showCart,
    showCheckout,
    showFinal,
  };

  return (
    <UserProgressContext.Provider value={userProgressContext}>
      {children}
    </UserProgressContext.Provider>
  );
};

export default UserProgressContext;
