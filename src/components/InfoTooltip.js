import React from "react";
import failure from "../images/failure.svg";
import success from "../images/success.svg";

function InfoTooltip({isOpen, onClose, onInfoTooltip}) {

    let ok = false;

    return (
        <section className={`popup ${isOpen && "popup_open"}`}>

            <div className="popup__container popup__container_info-tip">
                <button className="exit-button opacity "
                        type="reset"
                        aria-label="выйти"
                        value="выйти"
                        name="выйти"
                        onClick={onClose}
                />
                <div className="form__container">
                    <img className="form__image" src={ok ? success : failure} alt=""/>
                    <h3 className="form__title form__title_info-tip">{ok ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h3>
                </div>

            </div>
        </section>
    )
}

export default InfoTooltip;
