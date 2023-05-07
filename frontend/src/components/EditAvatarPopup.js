import PopupWithForm from "./PopupWithForm";
import React, { useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [userAvatar, setUserAvatar] = useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (currentUser) {
      setUserAvatar(currentUser.avatar);
    }
  }, [currentUser]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateAvatar({
      avatar: userAvatar,
    });
  }

  function handleChangeAvatar(e) {
    setUserAvatar(e.target.value);
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="changeAvatar"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <section className="popup__section">
        <input
          onChange={handleChangeAvatar}
          value={userAvatar}
          type="url"
          name="avatar"
          className="popup__text popup__job"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__input-error"></span>
      </section>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
