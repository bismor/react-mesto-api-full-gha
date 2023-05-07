import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const inputNameCard = React.useRef();
  const inputLinkCard = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: inputNameCard.current.value,
      link: inputLinkCard.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="cardPopup"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <section className="popup__section">
        <input
          ref={inputNameCard}
          type="text"
          name="name"
          className="popup__text popup__name"
          placeholder="Название"
          required
          minLength={2}
          maxLength={30}
        />
        <span className="popup__input-error"></span>
      </section>
      <section className="popup__section">
        <input
          ref={inputLinkCard}
          type="url"
          name="about"
          className="popup__text popup__job"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__input-error"></span>
      </section>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
