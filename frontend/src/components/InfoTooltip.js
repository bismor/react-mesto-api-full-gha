import close from "../images/Close.png";

function InfoTooltip ({status, visible, images, onClose}) {
  return (
    <div className={visible}>
      <div className="popup__access">
        <button type="button" onClick={onClose} className="popup__close">
          <img className="popup__img" src={close} alt="Закрыть" />
        </button>
        <img className="popup__sign" src={images} alt="Статус" />
        <h2 className="popup__status">{status}</h2>
      </div>
    </div>
  )
}

export default InfoTooltip 