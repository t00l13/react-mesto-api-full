import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main(props) {
  //ИСПОЛЬЗУЕМ ХУКИ СОСТОЯНИЯ
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <div className="main">
      <section className="profile">
        <img
          src={currentUser.avatar}
          alt="Аватар пользователя"
          className="profile__avatar"
        />
        <button
          className="profile__change-btn"
          type="button"
          onClick={props.onEditAvatar}
        ></button>
        <div className="profile__content">
          <div className="profile__wrapper">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__button-edit"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__button-add"
          onClick={props.onAddPhoto}
        ></button>
      </section>

      <section className="gallery">
        <ul className="gallery__list">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardDelete={props.onDeleteCard}
              onCardLike={props.onLikeCard}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Main;

