import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Register({ onLoginState, onRegister }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e)  {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onRegister({ email, password });
    }

    useEffect(() => {
        onLoginState(true);
    }, [onLoginState]);

    return (
        <section className="auth">
            <h2 className="auth__title">Регистрация</h2>
            <form className="form" onSubmit={handleSubmit} noValidate>
                <input className="form__input form__input_dark-mode"
                       name="email-register"
                       type="email"
                       placeholder="Email"
                       minLength="2"
                       maxLength="40"
                       id="email-register"
                       required
                       value={email || ""}
                       onChange={handleEmailChange}
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
                       value={password || ""}
                       onChange={handlePasswordChange}
                />
                <span className="form__input-error subtitle-input-error"/>
                <button className="opacity auth__submit" type="submit">Зарегистрироваться</button>
            </form>
            <h3 className="auth__subtitle">Уже зарегистрированы? <Link className="opacity auth__subtitle" to="sign-in">Войти</Link></h3>
        </section>
    )
}

export default Register;
