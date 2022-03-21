import { useState, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardDelete, onCardLike }) {

    const user = useContext(CurrentUserContext);

    const isOwner = card.owner._id === user._id;
    const [liked, setLiked] = useState(
        card.likes.some(i => i._id === user._id) // Does the card have a like set by the current user?
    );

    function handleClick() {
        onCardClick(card);
    }

    function likeClick() {
        setLiked(!liked);
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
       <div className="element">
        <button className={`${isOwner ? "delete-element-button opacity" : "delete-element-button_hide"}`}
                type="button"
                onClick={handleDeleteClick}
        />
        <img className="element__mask-group"
             onClick={handleClick}
             src={card.link}
             alt={card.name}
        />
        <div className="element__description">
            <h2 className="element__text">{card.name}</h2>
            <div className="element__like-container">
                <button className={`like-button opacity ${liked && 'like-button_active'}`}
                        onClick={likeClick}
                        type="button"
                />
                <span className="element__like-counter">{card.likes.length}</span>
            </div>
        </div>
       </div>
    );
}

export default Card;
