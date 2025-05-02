import classes from "./styles/Header.module.css";
import {Link} from 'react-router-dom'

export default function Header() {
    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                <nav className={classes.menu}>
                    <a href="#locations">Локації</a>
                    <a href="#about">Про нас</a>
                    <a href="#team">Команда</a>
                    <a href="#contacts">Контакти</a>
                    <Link to="/booking" className={classes.cta}>ЗАБРОНЮВАТИ ОНЛАЙН</Link>
                </nav>
            </div>

        </header>
    )
}