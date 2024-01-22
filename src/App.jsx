import { useState } from "react";

import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Final from "./components/Final";

function App() {
  const [status, setStatus] = useState();
  const handleOrderSubmit = (customerInfo, orderInfo) => {
    console.log("I will submit the order in App.jsx");
    console.log("customerInfo", customerInfo);
    console.log("orderInfo", orderInfo);
    // TODO - SEND ORDER TO BACKEND

    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
    }, 3000);
  };

  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout onSubmit={handleOrderSubmit} />
        <Final status={status} />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
