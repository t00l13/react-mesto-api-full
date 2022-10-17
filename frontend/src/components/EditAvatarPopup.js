import React from "react";
import PopupWithForm from "./PopupWithForm";
import useFormWithValidation from "../utils/hooks/useFormWithValidation";

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isRender,
  isOverlayPopupClose,
}) {
  const { values, errors, isValid, onChange, resetForm } =
    useFormWithValidation();

  const avatarRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
    onUpdateAvatar(values.link);
  }

  React.useEffect(() => {
    avatarRef.current.value = "";
    resetForm();
  }, [isOpen, resetForm]);

  return (
    <PopupWithForm
      name="change-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      btnName={isRender ? "Сохранение..." : "Сохранить"}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
      isOverlayPopupClose={isOverlayPopupClose}
    >
      <input
        ref={avatarRef}
        onChange={onChange}
        className="popup__input popup__input_type_change-avatar-link"
        type="url"
        id="avatar-input"
        name="link"
        placeholder="Ссылка на картинку"
        minLength="2"
        maxLength="200"
        required
      />
      <span
        id="avatar-input-error"
        className={`popup__input-error ${
          !isValid.link ? "popup__input-error_active" : ""
        } `}
      >
        {errors.link || ""}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

