import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function ConfirmPopup({
  deleteCard: { isOpen, card },
  onClose,
  onCardDelete,
  isRender,
  isOverlayPopupClose,
}) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onCardDelete(card);
  }
  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      btnName={isRender ? "Удаление..." : "Да"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={false}
      isOverlayPopupClose={isOverlayPopupClose}
    ></PopupWithForm>
  );
}

export default ConfirmPopup;

