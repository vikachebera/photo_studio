import classes from './styles/Footer.module.css'

export default function Footer() {
    return (
        <footer className={classes.footer}>
            <div className={classes.container}>


                <div className={classes.logo}>
                    <span>LOGO</span>
                </div>
                <nav className={classes.menu}>
                    <a href="/lightframe-studio/public">Головна</a>
                    <a href="/about">Про нас</a>
                    <a href="/services">Послуги</a>
                    <a href="/contacts">Контакти</a>
                </nav>

                <div className={classes.socials}>
                    <a href="https://instagram.com/"><img src="/assets/instagram.png" alt="Instagram"/></a>
                    <a href="https://facebook.com/"><img src="/assets/facebook.png" alt="Facebook"/></a>
                    <a href="https://t.me/"><img src="/assets/telegram.png" alt="Telegram"/></a>
                </div>

                <div className={classes.copyright}>
                    &copy; {new Date().getFullYear()} LOGO Studio. Усі права захищені.
                </div>

            </div>
        </footer>
    )
}