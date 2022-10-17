//ФУНКЦИОНАЛЬНЫЙ КОМПОНЕНТ ДЛЯ ПОПАПА С ФОРМОЙ
import React from "react";

function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  children,
  btnName,
  onSubmit,
  isDisabled = true,
  isOverlayPopupClose,
}) {


  return (
    <div>
      <div
        className={`popup popup_type_${name}} ${
          isOpen ? "popup_opened" : false
        }`}
        id={`popup-${name}`}
        onClick={isOverlayPopupClose}
      >
        <div className="popup__container">
          <button
            onClick={onClose}
            type="button"
            className="popup__btn-close"
          ></button>
          <h3 className={`popup__title popup__title_type_${name}`}>{title}</h3>
          <form
            className="popup__form"
            name={`${name}-form`}
            onSubmit={onSubmit}
            noValidate
          >
            {children}
            <button
              type="submit"
              name="button"
              className={`popup__btn-save ${
                isDisabled && "popup__btn-save_disable"
              }`}
              disabled={isDisabled}
            >
              {btnName}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PopupWithForm;

