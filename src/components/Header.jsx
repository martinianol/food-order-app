import { useContext } from "react";
import CartContext from "../store/CartContext";

import logoImg from "../assets/logo.jpg";
import Button from "./common/Button";

const Header = ({onOpenCart}) => {
  const { items } = useContext(CartContext);

  const totalCartItems = items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="App Logo" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly onClick={onOpenCart}>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
};

export default Header;
