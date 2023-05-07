import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ onCardClick, onCardLike, onCarDislike, card, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `mesto__like ${
    isLiked && "mesto__like-active"
  }`;

  function handleLikeClick() {
    if (isLiked) {
      onCarDislike(card);
    } else {
      onCardLike(card);
    }
  }

  function handleClick() {
    const cardInfo = { link: card.link, name: card.name };
    onCardClick(cardInfo);
  }

  return (
    <section className="mesto__element">
      {isOwn && (
        <button
          type="button"
          className="mesto__delete"
          onClick={() => {
            onCardDelete(card);
          }}
        />
      )}
      <img
        className="mesto__img"
        src={card.link}
        type="button"
        alt={card.name}
        onClick={handleClick}
      />
      <div className="reaction">
        <h2 className="mesto__title">{card.name}</h2>
        <div className="like">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <div className="like__score">{card.likes.length}</div>
        </div>
      </div>
    </section>
  );
}

export default Card;
