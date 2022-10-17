import React from "react";
import success from "../images/success.svg";
import error from "../images/error.svg";

function InfoTooltip({
  onClose,
  isOverlayPopupClose,
  result: { isOpen, successful },
}) {
  return (
    <section
      className={`popup popup__type_info ${isOpen ? "popup_opened" : false}`}
      onClick={isOverlayPopupClose}
    >
      <div className="popup__container popup__container_type_info">
        <img
          src={successful ? success : error}
          className="popup__photo popup__photo_type_info"
          alt="INFO"
        ></img>
        <h3 className="popup__title popup__title_type_info">
          {successful
            ? "Вы успешно зарегестрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h3>
        <button onClick={onClose} className="popup__btn-close"></button>
      </div>
    </section>
  );
}

export default InfoTooltip;

