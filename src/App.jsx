import { useState } from "react";

import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./store/CartContext";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

function App() {
  const [openCart, setOpenCart] = useState(false);
  const [openCheckout, setOpenCheckout] = useState(false);

  const handleOpenCart = () => {
    setOpenCart(true);
  };

  const handleCloseCart = () => {
    setOpenCart(false);
  };

  const handleCloseCheckout = () => {
    setOpenCheckout(false);
  };

  const handleGoToCheckout = () => {
    handleCloseCart()
    setOpenCheckout(true)
  }

  return (
    <CartContextProvider>
      <Header onOpenCart={handleOpenCart} />
      <main>
        <Meals />
      </main>
      <Cart open={openCart} onClose={handleCloseCart} onGoToCheckout={handleGoToCheckout}/>
      <Checkout open={openCheckout} onClose={handleCloseCheckout} total/>
    </CartContextProvider>
  );
}

export default App;
