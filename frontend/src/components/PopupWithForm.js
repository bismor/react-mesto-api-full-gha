import close from "../images/Close.png";
import { useMemo } from "react";

function PopupWithForm({ title, name, children, isOpen, onClose, buttonText, onSubmit}) {
  const popUpClassName = useMemo(() => {
    const baseClasses = `popup popup_type_${name}`;
    return isOpen ? `${baseClasses} popup_opened` : baseClasses;
  }, [name, isOpen]);

  return (
    <div className={popUpClassName}>
      <div className="popup__container">
        <button type="button" className="popup__close" onClick={onClose}>
          <img className="popup__img" src={close} alt="Закрыть" />
        </button>
        <h2 className="popup__title">{title}</h2>
        <form name={name} onSubmit={onSubmit} className="popup__form">
          {children}
          <button type="submit" className="popup__button">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
