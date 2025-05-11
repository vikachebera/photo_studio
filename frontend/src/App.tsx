import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from "./pages/Home";
import BookingPage from "./pages/Booking";
import Layout from "./components/Layout";
import CookieConsent from "react-cookie-consent";
import PrivacyPolicy from "./components/PrivacyPolicy";
import CookieBanner from "./components/CookieBanner";

function App() {

    return (
        <Router>

            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/booking" element={<BookingPage/>}/>
                    <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
                </Route>

            </Routes>
            <CookieBanner/>
        </Router>
    )
}

export default App
