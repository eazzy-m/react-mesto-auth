import { Link } from "react-router-dom";
import headerLogo from "../images/HeaderLogo.svg";
import burger from "../images/burger.svg";

function Header({ loggedIn, onSignOut, userData, loginState }) {

    const userMail = userData ? userData.email : "";

    return (
        <header className="header">
            <img className="header__logo" src={headerLogo} alt="Место"/>
            <button className="opacity burger-button"><img className="burger-button__vector" alt="Развернуть" src={burger}/></button>
            <div className="header__container">
            {loggedIn ? (
               <>
                <h3 className="header__title">{userMail}</h3>
                <Link className="opacity header__link header__link_murky" to="/login" onClick={onSignOut}>Выйти</Link>
               </>
            ) : <Link className="opacity header__link" to={loginState ? "/sign-in" : "/sign-up"}>
                {loginState ? "Войти" : "Регистрация"}
            </Link>
                }
            </div>
        </header>
    );
}

export default Header;
