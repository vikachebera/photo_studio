// @ts-ignore
import 'swiper/css';
// @ts-ignore
import "swiper/css/navigation";
// @ts-ignore
import 'swiper/css/pagination';
import {Swiper, SwiperSlide} from "swiper/react"
import {Navigation, Autoplay} from "swiper/modules"
import {Link} from "react-router-dom"
import classes from "./styles/Carousel.module.css";

export default function Carousel() {

    const images = [
        '/assets/loft/1.jpg',
        '/assets/nude/2.jpg',
        '/assets/loft/3.jpg',
        '/assets/nude/3.jpg',
        '/assets/nude/1.jpg'
    ]

    return (
        <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={1}
            slidesPerView={1}
            navigation
            autoplay={{delay: 4000, disableOnInteraction: false}}
            loop={true}
        >
            {images.map((src, index) => (
                <SwiperSlide key={index} className={classes.block}>
                    <img src={src} alt={`Slide ${index + 1}`} className={classes.image}/>
                    <div className={classes.text}>
                        <p className={classes.subtitle}>Обирайте вільний час та бронюйте вже зараз</p>
                        <span className={classes.logo}>STUDIO</span>
                        <span className={classes.logo}>LOGO</span>

                        <div className={classes.button}>
                            <Link className={classes.cta} to={'/booking'}>ЗАБРОНЮВАТИ</Link>
                        </div>
                    </div>

                </SwiperSlide>
            ))}
        </Swiper>
    )
}