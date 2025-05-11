import CookieConsent from "react-cookie-consent";
import {useLocation} from "react-router-dom";

export default function CookieBanner() {
    const location = useLocation();

    if (location.pathname === '/privacy-policy') {
        return null;
    }

    return (<CookieConsent
        location="bottom"
        buttonText="Прийняти"
        declineButtonText="Відмовитись"
        cookieName="gdprConsent"
        enableDeclineButton
        onAccept={() => {
            // window.initAnalytics();
        }}
        onDecline={() => {
            document.cookie = "analytics_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }}
        containerClasses="cookie-consent-container"
        contentClasses="cookie-consent-content"
        buttonClasses="cookie-consent-button"
        declineButtonClasses="cookie-consent-decline-button"
        overlayClasses="cookie-consent-overlay"
        expires={365}
        overlay
    >
        Цей сайт використовує cookies.
        <a href="/privacy-policy" target="_blank" className="cookie-consent-link">
            Детальніше
        </a>
        <div className="cookie-consent-checkbox-group">
            <label className="cookie-consent-checkbox-label">
                <input type="checkbox" checked disabled/> Необхідні
            </label>
            <label className="cookie-consent-checkbox-label">
                <input type="checkbox" defaultChecked/> Аналітика
            </label>
        </div>
    </CookieConsent>)
}