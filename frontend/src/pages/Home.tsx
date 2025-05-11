import Carousel from "../components/Carousel.tsx";
import AboutUs from "../components/AboutUs.tsx";
import Locations from "../components/Locations.tsx";
import Team from "../components/Team.tsx";
import Contacts from "../components/Contacts.tsx";

export default function Home() {
    return (
        <h1>
            <Carousel/>
            <AboutUs/>
            <Locations/>
            <Team/>
            <Contacts/>
        </h1>
    )
}