import React from "react";

function ImagePopup({ onClose, card, isOverlayPopupClose }) {
  React.useEffect(() => {
    const handleEscClose = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handlePopupClick = (event) => {
      if (event.target.classList.contains("popup")) {
        onClose();
      }
    };

    if (card.name) {
      document.addEventListener("keydown", handleEscClose);
      document.addEventListener("mousedown", handlePopupClick);
    }

    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("mousedown", handlePopupClick);
    };
  }, [card, onClose]);

  return (
    <div
      className={`popup popup_photo  ${card.name ? "popup_opened" : ""}`}
      id="popup-show-photo"
      onClick={isOverlayPopupClose}
    >
      <div className="popup__container popup__container_photo">
        <button
          type="button"
          className="popup__btn-close"
          onClick={onClose}
        ></button>
        <img className="popup__photo" src={card.link} alt={card.name} />
        <h2 className="popup__photo-title">{card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;