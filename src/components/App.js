import { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import Footer from "./Footer";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import Register from "./Register";

function App() {

    const [isEditAvatarOpen, setIsEditAvatarOpen] = useState(false);
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const [isAddPlaceOpen, setAddPlaceIsOpen] = useState(false);
    const [isImageOpen, setIsImageOpen] = useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState({name: "", link: ""});

    useEffect(() => {
        Promise.all([api.getUserInfoFromServer(), api.getCardsFromServer()])
            .then(([user, cards]) => {
                setCurrentUser(user);
                setCards(cards)})
            .catch(err => alert(`При загрузке данных с сервера возникла ${err}`));
    }, []);

    function handleCardLike(card) {
        // is there already a like on this card
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        // we send a request to the API and get updated card data
        api.changeLikeCard(card._id, isLiked)
            .then(newCard => setCards(state => state.map(c => c._id === card._id ? newCard : c)))
            .catch(err => alert(`При обновлении лайка карточки возникла ${err}`));
    }

    function handleDeleteCard(card) {
        api.deleteCardFromServer(card._id)
            .then(newCard => {
                const newCardsList = cards.filter(elem => elem._id === card._id ? null : newCard);
                setCards(newCardsList)})
            .catch(err => alert(`При удалении карточки возникла ${err}`));
    }

    function handleUpdateUserInfo(data) {
        api.patchUserInfo(data)
            .then(res => {
                setCurrentUser(res);
                closeAllPopups()})
            .catch(err => alert(`При обновлении данных пользователя возникла ${err}`));
    }

    function handleUpdateAvatar(data) {
        api.patchUserAvatar(data)
            .then(res => {
                setCurrentUser(res);
                closeAllPopups()})
            .catch(err => alert(`При обновлении аватара возникла ${err}`));
    }

    function handleAddPlace(data) {
        api.addCardToServer(data)
            .then(newCard => {
                setCards([newCard, ...cards]);
                closeAllPopups()})
            .catch(err => alert(`При отправке новой карточки вознкла ${err}`));
    }

    function handleEditAvatarClick() {
        setIsEditAvatarOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfileOpen(true);
    }

    function handleAddPlaceClick() {
        setAddPlaceIsOpen(true);
    }

    function handleImageClick(card) {
        setSelectedCard(card);
        setIsImageOpen(true);
    }

    function handleInfoTooltipClick() {
        setIsInfoTooltipOpen(true);
    }

    function closeAllPopups() {
        setAddPlaceIsOpen(false);
        setIsEditProfileOpen(false);
        setIsEditAvatarOpen(false);
        setIsImageOpen(false);
        setIsInfoTooltipOpen(false);
        setSelectedCard({ name: "", link: "" });
    }

  return (
      <>
          <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
              <Header
                  userMail={"test@mail.uu"}
              />
                <Route exact path="/">
                    <Register/>
                </Route>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/main">
                    <Main
                        onEditAvatar={handleEditAvatarClick}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onCardClick={handleImageClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleDeleteCard}
                        cards={cards}

                    />

                      <EditProfilePopup
                          isOpen={isEditProfileOpen}
                          onClose={closeAllPopups}
                          onUpdateUserInfo={handleUpdateUserInfo}
                      />

                      <EditAvatarPopup
                          isOpen={isEditAvatarOpen}
                          onClose={closeAllPopups}
                          onUpdateAvatar={handleUpdateAvatar}
                      />

                      <AddPlacePopup
                          isOpen={isAddPlaceOpen}
                          onClose={closeAllPopups}
                          onAddPlace={handleAddPlace}
                      />

                      <ImagePopup
                          card={selectedCard}
                          isOpen={isImageOpen}
                          onClose={closeAllPopups}
                      />

                    <InfoTooltip
                        isOpen={isInfoTooltipOpen}
                        onClose={closeAllPopups}
                        onInfoTooltip={handleInfoTooltipClick}
                    />

                </Route>



              <Footer/>

            </div>
          </CurrentUserContext.Provider>
      </>
  );
}

export default App;
