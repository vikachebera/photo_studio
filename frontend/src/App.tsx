import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from "./pages/Home.tsx";
import BookingPage from "./pages/Booking.tsx";
import Layout from "./components/Layout.tsx";
import CookieConsent from "react-cookie-consent";

function App() {

    return (
        <Router>

            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/booking" element={<BookingPage/>}/>
                </Route>

            </Routes>
            <CookieConsent
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
                        <input type="checkbox" checked disabled /> Необхідні
                    </label>
                    <label className="cookie-consent-checkbox-label">
                        <input type="checkbox" defaultChecked /> Аналітика
                    </label>
                </div>
            </CookieConsent>
        </Router>
    )
}

export default App
