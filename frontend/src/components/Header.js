import logo from "../images/logo.svg";

function Header({onClick, nameClick, setUserEmail}) {
  
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип сайта" />
      <div className="header__block">
        <p className="header__email">{setUserEmail}</p>
        <button onClick={onClick} className="header__button">{nameClick}</button>
      </div>
    </header>
  );
}

export default Header;
