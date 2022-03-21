import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";


function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

    const ref = useRef(null);

    useEffect(() => {
        ref.current.value = "";
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({ avatar: ref.current.value });
    }

    return (
        <PopupWithForm
            name={"avatar"}
            title={"Обновить аватар"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input className="form__input"
                   name="avatar"
                   type="url"
                   placeholder="url для аватара"
                   minLength="2"
                   id="avatar-input"
                   required
                   ref={ref}
            />
            <span className="form__input-error title-input-error"/>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;
