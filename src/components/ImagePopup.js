
function ImagePopup({isOpen, card, onClose}) {
    return (
        <section className={`popup popup_zoom-image ${isOpen && "popup_open"}`}>
            <div className="popup__container-zoom">
                <button className="exit-button exit-button_zoom-image-popup opacity"
                        onClick={onClose}
                        type="reset"
                        aria-label="выйти"
                        value="выйти"
                        name="выйти">
                </button>
                <figure className="popup__figure">
                    <img src={card.link}
                         alt={card.name}
                         className="popup__figure-img"/>
                    <figcaption className="popup__figcaption">{card.name}</figcaption>
                </figure>
            </div>
        </section>
    );
}

export default ImagePopup;
