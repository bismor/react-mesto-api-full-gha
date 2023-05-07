import closeIcon from "../images/Close.png";
import { useMemo } from "react";

function ImagePopup({ onClose, card }) {
  const popUpClassName = useMemo(() => {
    const baseClasses = `popup imagePopup`;
    return card != null ? `${baseClasses} popup_opened popup__shadow` : baseClasses;
  }, [card]);

  return (
    <div className={popUpClassName}>
      <div className="popup__picture">
        <button type="button" className="popup__close" onClick={onClose}>
          <img
            className="popup__img"
            id="closepict"
            src={closeIcon}
            alt="Закрыть"
          />
        </button>
        <img className="popup__screen" src={card?.link} alt={card?.name} />
        <h2 className="popup__subname">{card?.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
