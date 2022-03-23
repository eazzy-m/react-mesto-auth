import headerLogo from "../images/HeaderLogo.svg";
import burger from "../images/burger.svg"

function Header({ userMail }) {

    let register = true;
    let onLoginPage = false;

    return (
        <header className="header">
            <img className="header__logo" src={headerLogo} alt="Место"/>
            <button className="opacity burger-button"><img className="burger-button__vector" alt="" src={burger}/></button>
            <div className="header__container">
            {register ? (
               <>
                <h3 className="header__title">{userMail}</h3>
                <a className="opacity header__link header__link_murky" type="button" href="#">Выйти</a>
               </>
            ) : <a className="opacity header__link" type="button" href="#">{onLoginPage ? "Зарегистрироваться" : "Войти"}</a>}
            </div>
        </header>
    );
}

export default Header;
