import React from "react";
import { Link, withRouter } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(password, email);
  }
  return (
    <section className="auth-page">
      <div className="auth-page__container">
        <h3 className="auth-page__title">Регистрация</h3>
        <form className="auth-page__form" onSubmit={handleSubmit}>
          <input
            value={email}
            onChange={handleChangeEmail}
            id="login-input"
            type="email"
            name="login"
            placeholder="Email"
            minLength="2"
            maxLength="40"
            required
            className="auth-page__input"
          ></input>
          <input
            value={password}
            onChange={handleChangePassword}
            id="password-input"
            type="password"
            name="password"
            minLength="4"
            maxLength="10"
            required
            placeholder="Пароль"
            className="auth-page__input"
          ></input>
          <button className="auth-page__submit">Регистрация</button>
        </form>
        <Link to="/sign-in" className="auth-page__link">
          Уже зарегистрированы? Войти
        </Link>
      </div>
    </section>
  );
}

export default Register;