import React from "react";
import PopupWithForm from "./PopupWithForm";
import useFormWithValidation from "../utils/hooks/useFormWithValidation";

function AddPhotoPopup({ isOpen, onClose, onAddPhoto, isRender, isOverlayPopupClose }) {
  const { values, isValid, errors, onChange, resetForm } =
    useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPhoto(values);
  }

  React.useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  return (
    <PopupWithForm
      title="Новое место"
      name="add-photo"
      btnName={isRender ? "Сохранение..." : "Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
      isOverlayPopupClose={isOverlayPopupClose}
    >
      <input
        value={values.name || ""}
        onChange={onChange}
        className="popup__input popup__input_type_card-title"
        type="text"
        id="title-input"
        name="name"
        placeholder="Название"
        minLength="2"
        maxLength="40"
        required
      />
      <span
        id="title-input-error"
        className={`popup__input-error ${
          !isValid.name ? "popup__input-error_active" : ""
        } `}
      >
        {errors.name || ""}
      </span>
      <input
        value={values.link || ""}
        onChange={onChange}
        className="popup__input popup__input_type_card-link"
        type="url"
        id="link-input"
        name="link"
        placeholder="Ссылка на картинку"
        minLength="2"
        maxLength="200"
        required
      />
      <span
        id="link-input-error"
        className={`popup__input-error ${
          !isValid.link ? "popup__input-error_active" : ""
        } `}
      >
        {errors.link || ""}
      </span>
    </PopupWithForm>
  );
}

export default AddPhotoPopup;