import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import useFormWithValidation from "../utils/hooks/useFormWithValidation.js";

function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  isRender,
  isOverlayPopupClose,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const {
    values,
    setValues,
    errors,
    isValid,
    setIsValid,
    onChange,
    resetForm,
  } = useFormWithValidation();

  React.useEffect(() => {
    if (currentUser) {
      setValues({
        name: currentUser.name,
        about: currentUser.about,
      });
      setIsValid(true);
    }
  }, [currentUser, setIsValid, setValues]);

  React.useEffect(() => {
    resetForm({
      name: currentUser.name,
      about: currentUser.about,
    });
    setIsValid(true);
  }, [isOpen, resetForm, setIsValid, currentUser.name, currentUser.about]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(values);
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      btnName={isRender ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
      isOverlayPopupClose={isOverlayPopupClose}
    >
      <input
        value={values.name || ""}
        onChange={onChange}
        className="popup__input popup__input_type_profile-name"
        type="text"
        id="name-input"
        name="name"
        placeholder="Введите имя:"
        minLength="2"
        maxLength="40"
        required
      />
      <span
        id="name-input-error"
        className={`popup__input-error ${
          !isValid.name ? "popup__input-error_active" : ""
        } `}
      >
        {errors.name || ""}
      </span>
      <input
        value={values.about || ""}
        onChange={onChange}
        className="popup__input popup__input_type_profile-job"
        type="text"
        id="job-input"
        name="about"
        placeholder="Ваша профессия:"
        minLength="2"
        maxLength="200"
        required
      />
      <span
        id="job-input-error"
        className={`popup__input-error ${
          !isValid.about ? "popup__input-error_active" : ""
        } `}
      >
        {errors.about || ""}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;

