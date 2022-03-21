import { useContext } from "react";
import editButton from "../images/edit-vector.svg";
import addButton from "../images/add-button.svg";
import defaultAvatar from "../images/image.png"
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ onAddPlace, onCardDelete, onCardLike, cards, onCardClick, onEditAvatar, onEditProfile }) {

    const user = useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">

                <div className="profile__overlay">
                    <img className="profile__avatar"
                         alt="Это Вы"
                         src={user.avatar || defaultAvatar}
                         onClick={onEditAvatar}
                    />
                </div>

                <div className="profile__info">
                    <h1 className="profile__info-title">{user.name || "Жак-Ив Кусто"}</h1>
                    <button className="edit-button opacity button-open-form"
                            type="button"
                            aria-label="изменить"
                            onClick={onEditProfile}>
                        <img className="edit-button__vector" src={editButton} alt="Изменить"/>
                    </button>
                    <p className="profile__info-subtitle">{user.about || "Исследователь океана"}</p>
                </div>

                <button className="add-button opacity button-open-form"
                        type="button"
                        aria-label="добавить"
                        onClick={onAddPlace}>
                    <img className="add-button__vector" src={addButton} alt="Добавить"/>
                </button>
            </section>

            <section className="elements">
                {cards.map(card => (
                    <Card key={card._id}
                          card={card}
                          onCardClick={onCardClick}
                          onCardLike={onCardLike}
                          onCardDelete={onCardDelete}
                    />
                ))}
            </section>

        </main>
    );
}

export default Main;
