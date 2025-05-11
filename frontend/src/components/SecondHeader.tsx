import classes from "./styles/Header.module.css";
import { Link } from 'react-router-dom';

export default function SecondHeader() {
    return (
        <header className={classes.second_header}>

            <div className={classes.logo}>
                <span>LOGO</span>
            </div>
            <nav className={classes.nav}>
                <Link to="/" className={classes.cta}>На головну</Link>
            </nav>

        </header>
    )
}