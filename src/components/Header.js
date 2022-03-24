import { Link } from "react-router-dom";
import headerLogo from "../images/HeaderLogo.svg";
import burger from "../images/burger.svg"

function Header({ userMail }) {

    let register = true;
    let onLoginPage = false;

    return (
        <header className="header">
            <img className="header__logo" src={headerLogo} alt="Место"/>
            <button className="opacity burger-button"><img className="burger-button__vector" alt="Развернуть" src={burger}/></button>
            <div className="header__container">
            {register ? (
               <>
                <h3 className="header__title">{userMail}</h3>
                <Link className="opacity header__link header__link_murky" to="/login">Выйти</Link>
               </>
            ) : onLoginPage ?
                <Link className="opacity header__link" to="/">Зарегистрироваться</Link> :
                (
                <Link className="opacity header__link" to="/login">Войти</Link>
                )
                }
            </div>
        </header>
    );
}

export default Header;
