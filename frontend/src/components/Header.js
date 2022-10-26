import React from "react";
import HeaderLogo from "../images/header__logo.svg";
import { Link, Route, Switch } from "react-router-dom";

function Header({ email, onSignOut }) {
  const [isClicked, setIsClicked] = React.useState(false);

  function handleClickMenu() {
    setIsClicked(!isClicked);
  }
  return (
    <div className="header">
      <div
        className={`header__container ${
          isClicked ? "header__container_small-menu" : ""
        }`}
      >
        <img
          src={HeaderLogo}
          alt="Логотип"
          className={`header__logo logo ${isClicked ? "logo_small-menu" : ""}`}
        />
        <Switch>
          <Route path="/signin">
            <Link to="signup" className="header__link">
              Регистрация
            </Link>
          </Route>
          <Route path="/signup">
            <Link to="signin" className="header__link">
              Войти
            </Link>
          </Route>
          <Route exact path="/">
            <div
              className={`header__menu-btn ${
                isClicked ? "header__menu-btn_close" : ""
              }`}
              onClick={handleClickMenu}
            >
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div
              className={`header__user-container ${
                isClicked ? "header__user-container_small-menu" : ""
              }`}
            >
              <p className="header__email">{email}</p>
              <button
                onClick={() => {
                  onSignOut();
                  handleClickMenu();
                }}
                className="header__link header__button"
              >
                Выйти
              </button>
            </div>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Header;