//ФУНКЦИОНАЛЬНЫЙ КОМПОНЕНТ КАРТОЧКИ
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `card__btn-trash ${
    isOwn ? "card__btn-trash_visible" : "card__btn-trash_hidden"
  }`;

  function handleCardDelete() {
    props.onCardDelete(props.card);
  }

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const even = (like) => like === currentUser._id;
  const isLiked = props.card.likes.some(even);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `card__btn-like ${
    isLiked ? "card__btn-like_active" : ""
  }`;

  function handleCardLike() {
    props.onCardLike(props.card);
  }

  function handleCardClick() {
    props.onCardClick(props.card);
  }

  return (
    <li className="gallery__item card">
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleCardDelete}
      ></button>
      <img
        className="card__image"
        src={props.card.link}
        alt={`Фото ${props.card.name}`}
        onClick={handleCardClick}
      />
      <div className="card__wrapper">
        <h3 className="card__title">{props.card.name}</h3>
        <div className="card__like-area">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleCardLike}
          ></button>
          <p className="card__sum-like">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;

