import { useState } from 'react';
import classes from "./styles/Header.module.css";
import { Link } from 'react-router-dom';

export function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <header className={classes.header}>
                <div className={classes.logo}>
                    LOGO
                </div>
                <nav className={classes.menu}>
                    <a href="#about">Про нас</a>
                    <a href="#locations">Локації</a>
                    <a href="#team">Команда</a>
                    <a href="#contacts">Контакти</a>
                    <Link to="/booking" className={classes.cta}>ЗАБРОНЮВАТИ ОНЛАЙН</Link>
                </nav>
                <div
                    className={`${classes.burger} ${menuOpen ? classes.open : ''}`}
                    onClick={toggleMenu}
                >
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </header>

            <div className={`${classes.mobile_menu} ${menuOpen ? classes.open : ''}`}>
                <a href="#about" onClick={() => setMenuOpen(false)}>Про нас</a>
                <a href="#locations" onClick={() => setMenuOpen(false)}>Локації</a>
                <a href="#team" onClick={() => setMenuOpen(false)}>Команда</a>
                <a href="#contacts" onClick={() => setMenuOpen(false)}>Контакти</a>
                <Link
                    to="/booking"
                    className={classes.cta}
                    onClick={() => setMenuOpen(false)}
                >
                    ЗАБРОНЮВАТИ ОНЛАЙН
                </Link>
            </div>
        </>
    );
}

export default Header;