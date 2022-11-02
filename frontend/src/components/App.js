import React from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPhotoPopup from "./AddPhotoPopup";
import ImagePopup from "./ImagePopup";
import ConfirmPopup from "./ConfirmPopup";
import InfoTooltip from "./InfoTooltip";
import Register from "./Register";
import Login from "./Login";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";

import * as auth from "../utils/auth.js";

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = React.useState({});

  const [isEditProfilePopupOpen, setEditProfileClick] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarClick] = React.useState(false);
  const [isAddPhotoPopupOpen, setAddPhotoClick] = React.useState(false);
  const [isInfoTooltip, setInfoTooltip] = React.useState({
    isOpen: false,
    successful: false,
  });

  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [selectedCardDeleteConfirm, setSelectedCardDeleteConfirm] =
    React.useState({
      isOpen: false,
      card: {},
    });

  const [renderSave, setRenderSave] = React.useState(false);

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");

  //Выводим информацию профиля
  React.useEffect(() => {
    api.getUserData()
      .then(data => {
        handleLoggedIn();
        setEmail(email);
        setCurrentUser(data.message);
        history.push('/');
      })
      .catch(err => {
        console.log(err);
      })
  }, [history, loggedIn]);

  //Выводим карточки
  React.useEffect(() => {
    if (loggedIn) {
      api
        .getInitialCards()
        .then((data) => {
          setCards(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((data) => {
          if (data) {
            setEmail(data.email);
            handleLoggedIn();
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [history]);

  //ОБРАБОТЧИКИ
  function handleLoggedIn() {
    setLoggedIn(true);
  }

  function handleInfoTooltip(result) {
    setInfoTooltip({
      ...isInfoTooltip,
      isOpen: true,
      successful: result,
    });
  }

  //ОБРАБОТЧИКИ ПОПАПОВ
  function handleEditAvatarClick() {
    setEditAvatarClick(true);
  }

  function handleEditProfileClick() {
    setEditProfileClick(true);
  }

  function handleAddPhotoClick() {
    setAddPhotoClick(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleOverlayPopupClick(evt) {
    if (evt.target.classList.contains("popup")) closeAllPopups();
  }

  function handleCardDeleteClick(card) {
    setSelectedCardDeleteConfirm({
      ...selectedCardDeleteConfirm,
      isOpen: true,
      card: card,
    });
  }

  function handleCardDelete(card) {
    setRenderSave(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setRenderSave(false);
      });
  }

  function handleCardLike(card) {
    const even = (like) => like === currentUser._id;
    const isLiked = card.likes.some(even);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(data) {
    setRenderSave(true);
    api
      .saveUserChanges(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setRenderSave(false);
      });
  }

  function handleUpdateAvatar(data) {
    console.log(data);
    setRenderSave(true);
    api
      .changeAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setRenderSave(false);
      });
  }

  function handleAddPhotoSubmit(data) {
    setRenderSave(true);
    api
      .postNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setRenderSave(false);
      });
  }

  function handleRegister(password, email) {
    auth
      .register(password, email)
      .then((data) => {
        if (data) {
          handleInfoTooltip(true);
          history.push("/signin");
        }
      })
      .catch((err) => {
        console.log(err);
        handleInfoTooltip(false);
      });
  }

  function handleLogin(password, email) {
    auth
      .login(password, email)
      .then((data) => {
        if (data.token) {
          setEmail(email);
          handleLoggedIn();
          localStorage.setItem("jwt", data.token);
          history.push("/");
        }
      })
      .catch((err) => {
        handleInfoTooltip(false);
        console.log(err);
      });
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setEmail("");
    history.push("/signin");
  }

  function closeAllPopups() {
    setAddPhotoClick(false);
    setEditAvatarClick(false);
    setEditProfileClick(false);
    setSelectedCard({});
    setSelectedCardDeleteConfirm({
      ...selectedCardDeleteConfirm,
      isOpen: false,
    });
    setInfoTooltip({
      isOpen: false,
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="container">
          <Header email={currentUser.email} onSignOut={handleSignOut} />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}
              cards={cards}
              onAddPhoto={handleAddPhotoClick}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onCardClick={handleCardClick}
              onLikeCard={handleCardLike}
              onDeleteCard={handleCardDeleteClick}
            />

            <Route path="/signin">
              <Login onLogin={handleLogin} />
            </Route>

            <Route path="/signup">
              <Register onRegister={handleRegister} />
            </Route>

            <Route path="*">
              
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
            </Route>
          </Switch>
          <Footer />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isRender={renderSave}
            isOverlayPopupClose={handleOverlayPopupClick}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isRender={renderSave}
            isOverlayPopupClose={handleOverlayPopupClick}
          />
          <AddPhotoPopup
            isOpen={isAddPhotoPopupOpen}
            onClose={closeAllPopups}
            onAddPhoto={handleAddPhotoSubmit}
            isRender={renderSave}
            isOverlayPopupClose={handleOverlayPopupClick}
          />
          <ImagePopup
            onClose={closeAllPopups}
            card={selectedCard}
            isRender={renderSave}
            isOverlayPopupClose={handleOverlayPopupClick}
          />
          <ConfirmPopup
            deleteCard={selectedCardDeleteConfirm}
            onClose={closeAllPopups}
            onCardDelete={handleCardDelete}
            isRender={renderSave}
            isOverlayPopupClose={handleOverlayPopupClick}
          />
          <InfoTooltip
            onClose={closeAllPopups}
            result={isInfoTooltip}
            isOverlayPopupClose={handleOverlayPopupClick}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

