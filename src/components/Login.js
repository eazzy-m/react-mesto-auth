import React from "react";

function Login() {

    return (
        <section className="auth">
            <h2 className="auth__title">Вход</h2>
            <form className="form">
                <input className="form__input form__input_dark-mode"
                       name="email-login"
                       type="email"
                       placeholder="Email"
                       minLength="2"
                       maxLength="40"
                       id="email-login"
                       required
                />
                <span className="form__input-error title-input-error"/>
                <input className="form__input form__input_dark-mode"
                       name="password-login"
                       type="password"
                       placeholder="Пароль"
                       minLength="2"
                       maxLength="200"
                       id="password-login"
                       required
                />
                <span className="form__input-error subtitle-input-error"/>
                <button className="opacity auth__submit" type="submit">Войти</button>
            </form>
        </section>
    )
}

export default Login;
