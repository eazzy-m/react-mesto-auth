
function PopupWithForm({ isOpen, onSubmit, onClose, name, title, children }) {

    return (
        <section className={`popup ${isOpen && "popup_open"}`}>

            <div className="popup__container">
                <button className="exit-button exit-button_popup_profile opacity"
                        type="reset"
                        aria-label="выйти"
                        value="выйти"
                        name="выйти"
                        onClick={onClose}
                />
                <form className={`form edit-${name}-form`}
                      onSubmit={onSubmit}
                      name="profile_info"
                      method="POST"
                      noValidate>
                      <div className="form__container">
                        <h3 className="form__title">{title}</h3>
                          {children}
                        <button className="opacity form__submit" aria-label="Cохранить" type="submit">Cохранить</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default PopupWithForm;
