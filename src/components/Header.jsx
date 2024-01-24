import { useContext } from "react";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

import logoImg from "../assets/logo.jpg";
import Button from "./common/Button";

const Header = () => {
  const { items } = useContext(CartContext);
  const { showModal } = useContext(UserProgressContext);

  const totalCartItems = items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  const handleShowCart = () => {
    showModal("cart")
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="App Logo" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
};

export default Header;
