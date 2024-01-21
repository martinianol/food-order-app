import { useState } from "react";

import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./store/CartContext";
import Cart from "./components/Cart";

function App() {
  const [openCart, setOpenCart] = useState(false);

  const handleOpenCart = () => {
    setOpenCart(true);
  };

  const handleCloseCart = () => {
    setOpenCart(false);
  };

  return (
    <CartContextProvider>
      <Header onOpenCart={handleOpenCart} />
      <main>
        <Meals />
      </main>
      <Cart open={openCart} onClose={handleCloseCart} />
    </CartContextProvider>
  );
}

export default App;
