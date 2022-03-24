import React from "react";
import { Link } from "react-router-dom";

function Register() {

    return (
        <section className="auth">
            <h2 className="auth__title">Регистрация</h2>
            <form className="form">
                <input className="form__input form__input_dark-mode"
                       name="email-register"
                       type="email"
                       placeholder="Email"
                       minLength="2"
                       maxLength="40"
                       id="email-register"
                       required
                />
                <span className="form__input-error title-input-error"/>
                <input className="form__input form__input_dark-mode"
                       name="password-register"
                       type="password"
                       placeholder="Пароль"
                       minLength="2"
                       maxLength="200"
                       id="password-register"
                       required
                />
                <span className="form__input-error subtitle-input-error"/>
                <button className="opacity auth__submit" type="submit">Зарегистрироваться</button>
            </form>
            <h3 className="auth__subtitle">Уже зарегистрированы? <Link className="opacity auth__subtitle" to="/login">Войти</Link></h3>
        </section>
    )
}

export default Register;
