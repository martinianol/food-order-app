import { createContext, useState } from "react";

const UserProgressContext = createContext({
  progress: null, // "cart" "checkout" "final"
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
  showFinal: () => {},
  hideFinal: () => {},
});

export const UserContextProvider = ({ children }) => {
  const [userProgress, setUserProgress] = useState(null);

  const showCart = () => setUserProgress("cart");
  const hideModal = () => setUserProgress(null);
  const showCheckout = () => setUserProgress("checkout");
  const showFinal = () => {
    console.log("I will change user progress to final");
    setUserProgress("final");
  };

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
