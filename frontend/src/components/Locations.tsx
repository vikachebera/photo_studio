import classes from "./styles/Locations.module.css";
// @ts-ignore
import locations from "../data/locations"
// @ts-ignore
import 'swiper/css';
// @ts-ignore
import "swiper/css/navigation";
// @ts-ignore
import 'swiper/css/pagination';
import {Swiper, SwiperSlide} from "swiper/react"
import {Navigation} from "swiper/modules"


export default function Locations() {
    const getImages = (locationName) => {
        const count = 3;
        return Array.from({ length: count }, (_, i) =>
            `/assets/${locationName.toLowerCase()}/${i + 1}.jpg`
        );
    };

    return (
        <div className={classes.container} id='locations'>
            <h2 className={classes.title}>Локації</h2>
            <div className={classes.content}>
                {locations.map((location, index) => {
                    const images = getImages(location.name);
                    return (
                        <div className={classes.card} key={index}>
                            <Swiper className={classes.swiperButton}
                                modules={[Navigation]}
                                loop={true}
                                navigation
                                spaceBetween={10}
                                slidesPerView={1}
                            >
                                {images.map((src, idx) => (
                                    <SwiperSlide key={idx}>
                                        <img src={src} alt={`${location.name} ${idx + 1}`} className={classes.image} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <h3 className={classes.name}>{location.name}</h3>
                            <p className={classes.text}><strong>Ціна:</strong> {location.price} грн/год</p>
                            <p className={classes.text}><strong>Площа:</strong> {location.square} м²</p>
                            <p className={classes.description}>{location.description}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}