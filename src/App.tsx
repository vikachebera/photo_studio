import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from "./pages/Home.tsx";
import BookingPage from "./pages/Booking.tsx";
import Layout from "./components/Layout.tsx";

function App() {

    return (
        <Router>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/booking" element={<BookingPage/>}/>
                </Route>
            </Routes>

        </Router>
    )
}

export default App
