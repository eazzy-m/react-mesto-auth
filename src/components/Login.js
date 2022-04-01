import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

function Login({ onLogin, onLoginState }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!email || !password) return

        onLogin({ email, password })
            .then(() => history.push("/"))
            .catch(err => alert(err))
    }

    useEffect(() => {
        onLoginState(false);
    }, [onLoginState]);

    return (
        <section className="auth">
            <h2 className="auth__title">Вход</h2>
            <form className="form" onSubmit={handleSubmit}>
                <input className="form__input form__input_dark-mode"
                       name="email-login"
                       type="email"
                       placeholder="Email"
                       minLength="2"
                       maxLength="40"
                       id="email-login"
                       required
                       value={email || ""}
                       onChange={handleEmailChange}
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
                       value={password|| ""}
                       onChange={handlePasswordChange}
                />
                <span className="form__input-error subtitle-input-error"/>
                <button className="opacity auth__submit" type="submit">Войти</button>
                <h3 className="auth__subtitle">Ещё не зарегистрированы? <Link className="opacity auth__subtitle" to="/sign-up">Войти</Link></h3>
            </form>
        </section>
    )
}

export default Login;
