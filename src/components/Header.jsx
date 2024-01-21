import logoImg from "../assets/logo.jpg";
import Button from "./common/Button";

const Header = () => {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="App Logo" />
        <h1>ReactFood</h1>
      </div>
      <Button textOnly>Cart (3)</Button>
    </header>
  );
};

export default Header;
