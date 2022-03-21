import { useContext, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ onClose, onUpdateUserInfo, isOpen }) {
    const user = useContext(CurrentUserContext);
    const [name, setName] = useState("");
    const [about, setAbout] = useState("");

    function handleUserName(e) {
        setName(e.target.value);
    }

    function handleUserAbout(e) {
        setAbout(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUserInfo({ name, about });
    }

    useEffect(() => {
        setName(user.name);
        setAbout(user.about);
    }, [isOpen, user]);

    return (
        <PopupWithForm
            name={"profile"}
            isOpen={isOpen}
            onClose={onClose}
            title={"Редактировать профиль"}
            onSubmit={handleSubmit}
        >
            <input className="form__input"
                   name="name"
                   type="text"
                   placeholder="Имя"
                   minLength="2"
                   maxLength="40"
                   id="title-input"
                   required
                   value={name || ""}
                   onChange={handleUserName}
            />
            <span className="form__input-error title-input-error"/>
            <input className="form__input"
                   name="about"
                   type="text"
                   placeholder="Профессиональная деятельность"
                   minLength="2"
                   maxLength="200"
                   id="subtitle-input"
                   required
                   value={about || ""}
                   onChange={handleUserAbout}
            />
            <span className="form__input-error subtitle-input-error"/>
        </PopupWithForm>
    )
}

export default EditProfilePopup;
