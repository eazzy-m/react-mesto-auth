import { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory, HashRouter } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import Footer from "./Footer";

import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import Register from "./Register";
import auth from "../utils/auth";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import ProtectedRoute from "./ProtectedRoute";

function App() {

    const [isEditAvatarOpen, setIsEditAvatarOpen] = useState(false);
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const [isAddPlaceOpen, setAddPlaceIsOpen] = useState(false);
    const [isImageOpen, setIsImageOpen] = useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  //  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginState, setLoginState] = useState(false);
    const [success, setSuccess] = useState(false);
    const [userData, setUserData] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState({name: "", link: ""});
    const history = useHistory();

    useEffect(() => {
        if(setLoggedIn) {
            Promise.all([api.getUserInfoFromServer(), api.getCardsFromServer()])
                .then(([user, cards]) => {
                    setCurrentUser(user);
                    setCards(cards)})
                .catch(err => alert(`При загрузке данных с сервера возникла ${err}`));
        }

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

    function handleLogin({ email, password }) {
        return auth.authorize(email, password)
            .then(res => {
                if (res.token) {
                    setLoggedIn(true);
                    history.push("/");
                } else new Error("Не удалось войти в аккаунт");})
            .catch(err => {
                console.log(err);
                handleTooltipOpen();
            });
    }

    function handleTooltipOpen() {
        setIsInfoTooltipOpen(true);
    }

    function handleLoginState(state) {
        setLoginState(state);
    }

    function handleRegister({ email, password }) {
        return auth.register(email, password)
            .then(res => {
                if (res) {
                    handleSuccessToolTip();
                    history.push("/sign-in");
                } else new Error("Не удалось завершить регистрацию")})
            .catch(err => {
                console.log(err);
                handleTooltipOpen();
            });
    }

    function handleSuccessToolTip() {
        setSuccess(true);
    }

    function signOut() {
        localStorage.removeItem("jwt");
        setLoggedIn(false);
        history.push("/sign-in");
    }

    function checkToken() {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            auth.getContent(jwt)
                .then(res => {
                    if (res) {
                        setLoggedIn(true);
                        history.push("/");
                        setUserData({
                            id: res.data._id,
                            email: res.data.email,
                        });
                    } else localStorage.removeItem("jwt");
                })
                .catch(err => {
                    console.log(err);
                    history.push("/sign-in");
                });
        }
    }

    useEffect(() => {
        checkToken();
    }, [loggedIn]);

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

    function handleInfoTooltipOpen() {
        setIsInfoTooltipOpen(true);
    }

    function closeAllPopups() {
        setAddPlaceIsOpen(false);
        setIsEditProfileOpen(false);
        setIsEditAvatarOpen(false);
        setIsImageOpen(false);
        setIsInfoTooltipOpen(false);
        setSuccess(false);
        setSelectedCard({ name: "", link: "" });
    }

    return (
        <HashRouter basename={process.env.PUBLIC_URL}>
          <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
              <Header
                  loggedIn={loggedIn}
                  loginState={loginState}
                  onSignOut={signOut}
                  userData={userData}
              />
                <Switch>
                    <Route path="/sign-up">
                        <Register
                            onRegister={handleRegister}
                            onLoginState={handleLoginState}
                            openToolTip={handleInfoTooltipOpen}
                        />
                    </Route>
                    <Route path="/sign-in">
                        <Login
                            onLogin={handleLogin}
                            onLoginState={handleLoginState}
                        />
                    </Route>

                        <ProtectedRoute
                            exact path="/"
                            component={Main}
                            loggedIn={loggedIn}
                            onEditAvatar={handleEditAvatarClick}
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onCardClick={handleImageClick}
                            onCardLike={handleCardLike}
                            onCardDelete={handleDeleteCard}
                            cards={cards}
                        />

                    <Route>
                            { loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" /> }
                    </Route>
                </Switch>

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
                    onInfoTooltip={handleInfoTooltipOpen}
                    success={success}
                />
              <Footer/>

            </div>
          </CurrentUserContext.Provider>
        </HashRouter>
  );
}

export default App;
