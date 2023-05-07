import plus from "../images/plus.svg";
import pencil from "../images/pencil.svg";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

function Main({ onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardLike, onCarDislike, onCardDelete, setloggedIn, setUserEmail}) {
  const user = React.useContext(CurrentUserContext);
  const navigate = useNavigate()


  function handleSignout (){
    localStorage.removeItem('token');
    setloggedIn(false)
    navigate('/', {replace: true});
  }

  return (
    <>
      <Header onClick={handleSignout} nameClick="Выйти" setUserEmail={setUserEmail}></Header>
      <main className="main">
        <section className="profile">
          <div className="info">
            <button
              type="button"
              className="profile__buttonpict"
              onClick={() => onEditAvatar(true)}
            >
              <div className="profile__changeavatar"></div>
              <img className="profile__avatar" src={user?.avatar} alt="Аватар" />
            </button>
            <div className="profile__info">
              <h1 className="profile__title">{user?.name}</h1>
              <button
                type="button"
                className="profile__button"
                onClick={() => onEditProfile(true)}
              >
                <img
                  className="profile__pencil"
                  src={pencil}
                  alt="Редактировать"
                />
              </button>
              <p className="profile__subtitle">{user?.about}</p>
            </div>
          </div>
          <button
            type="button"
            className="button"
            onClick={() => onAddPlace(true)}
          >
            <img className="profile__plus" src={plus} alt="добавить" />
          </button>
        </section>
        <section className="mesto">
          <ul className="mesto__ul">
            {cards.map((cardData) => (
                <li key={cardData._id}>
                  <Card
                    card={cardData}
                    onCardClick={onCardClick}
                    onCardLike={onCardLike}
                    onCarDislike={onCarDislike}
                    onCardDelete={onCardDelete}
                  ></Card>
                </li>
              ))}
          </ul>
        </section>
      </main>
    </>
  );
}

export default Main;
