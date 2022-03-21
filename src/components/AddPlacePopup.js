import  { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    
    const [name, setName] = useState("");
    const [link, setLink] = useState("");
    
    function handleAddCardName(e) {
        setName(e.target.value);
    }

    function handleAddCardLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({ name, link });
    }

    useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);
    
    return (
        <PopupWithForm
            name={"elements"}
            title={"Новое место"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input className="form__input"
                   name="name"
                   type="text"
                   placeholder="Название"
                   minLength="2"
                   maxLength="30"
                   id="place-input"
                   required
                   onChange={handleAddCardName}
                   value={name || ""}
            />
            <span className="form__input-error title-input-error"/>
            <input className="form__input"
                   name="link"
                   type="url"
                   placeholder="Ссылка на картинку"
                   id="url-input"
                   required
                   onChange={handleAddCardLink}
                   value={link || ""}
            />
            <span className="form__input-error subtitle-input-error"/>
        </PopupWithForm>
    )
}

export default AddPlacePopup;
