import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import {Outlet, useLocation} from "react-router-dom"
import SecondHeader from "./SecondHeader.tsx";

export default function Layout() {
    const location = useLocation();
    const showHeader = location.pathname === '/';
    const showSecondHeader = location.pathname !== '/';
    return (
        <>
            {showHeader && <Header/>}
            {showSecondHeader && <SecondHeader/>}
            <Outlet/>
            <Footer/>
        </>
    )
}