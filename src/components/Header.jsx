import logoImg from "../assets/logo.jpg"

const Header = () => {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="App Logo"/>
        <h1>ReactFood</h1>
      </div>
      <button className="text-button">Cart (3)</button>
    </header>
  );
};

export default Header;
