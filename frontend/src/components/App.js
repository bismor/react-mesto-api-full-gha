import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import auth from "../utils/Auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React, { useCallback, useState, useEffect } from "react";
import ImagePopup from "./ImagePopup";
import { useNavigate, Route, Routes } from "react-router-dom";
import "../App.css";
import api from "../utils/Api";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setloggedIn] = useState(false);
  const [userEmail, setUseremail] = useState("");

  const navigate = useNavigate();

  const tokenCheck = useCallback(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      if (token) {
        api.changeAuthToken(token);
        auth
          .checkJwtToken(token)
          .then((res) => {
            if (res) {
              setloggedIn(true);
              setUseremail(res.data.email);
              navigate("/", { replace: true });
            }
          })
          .catch((err) => {
            console.log(err); // выведем ошибку в консоль
          });
      }
    } else {
      setUseremail("");
    }
  }, [navigate]);

  const handleCardClick = useCallback((CardInfo) => {
    setSelectedCard(CardInfo);
  }, []);

  useEffect(() => {
    tokenCheck();
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });

    const getCardsData = async () => {
      try {
        const cards = await api.getInitialCards();
        setCards(cards);
      } catch (err) {
        console.log(err);
      }
    };
    getCardsData();
  }, [loggedIn, tokenCheck]);

  const closeAllPopups = useCallback(() => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);

    setSelectedCard(null);
  }, []);

  function handleCardLike(card) {
    api
      .addLikeCard(card._id)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleCardDisLike(card) {
    api
      .removeLikeCard(card._id)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleCardDelete(newCard) {
    api
      .deleteCardServer(newCard._id)
      .then(() => {
        setCards(cards.filter((card) => card._id !== newCard._id));
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleUpdateUser(userInfo) {
    api
      .setUserInfo(userInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleUpdateAvatar(userAvatar) {
    api
      .setUserAvatar(userAvatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleAddPlaceSubmit(newcard) {
    api
      .addCard(newcard)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                setUserEmail={userEmail}
                setloggedIn={setloggedIn}
                onEditAvatar={setIsEditAvatarPopupOpen}
                onEditProfile={setIsEditProfilePopupOpen}
                onAddPlace={setIsAddPlacePopupOpen}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCarDislike={handleCardDisLike}
                onCardDelete={handleCardDelete}
                cards={cards}
                element={Main}
              ></ProtectedRoute>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login
                name="Войти"
                button="Войти"
                setloggedIn={setloggedIn}
              ></Login>
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register
                name="Регистрация"
                button="Зарегистрироваться"
              ></Register>
            }
          />
        </Routes>
        <Footer></Footer>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup onClose={closeAllPopups} card={selectedCard}></ImagePopup>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
