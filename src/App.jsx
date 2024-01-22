import { useContext, useState } from "react";

import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./store/CartContext";
import UserProgressContext, {
  UserContextProvider,
} from "./store/UserProgressContext";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Final from "./components/Final"

function App() {
  const [status, setStatus] = useState()
  const { showFinal } = useContext(UserProgressContext);
  const handleOrderSubmit = (customerInfo, orderInfo) => {
    console.log("I will submit the order in App.jsx");
    console.log("customerInfo", customerInfo);
    console.log("orderInfo", orderInfo);
    // TODO - SEND ORDER TO BACKEND

    //setOpenCheckout(false);
    setStatus("submitting")
    setTimeout(() => {
      setStatus("success");
    }, 3000);
  };

  return (
    <CartContextProvider>
      <UserContextProvider>
        <Header />
        <main>
          <Meals />
        </main>
        <Cart />
        <Checkout onSubmit={handleOrderSubmit} />
        <Final status={status}/>
      </UserContextProvider>
    </CartContextProvider>
  );
}

export default App;
