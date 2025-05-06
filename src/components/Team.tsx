import classes from "./styles/Team.module.css";
import team from '../data/team'
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation} from "swiper/modules";

export default function Team() {
    return (
        <div id='team'>

            <div className={classes.wrapper}>
                <h1 className={classes.title}>Наша команда</h1>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={1}
                    slidesPerView={3}
                    navigation={true}
                    autoplay={{delay: 5000, disableOnInteraction: false}}
                    loop={true}
                >
                    {team.map((person, i) => (
                        <SwiperSlide>
                            <div className={classes.container}>
                                <div className={classes.block}>
                                    <img src={person.image} alt={person.name} className={classes.image}/>
                                    <h3 className={classes.name}>{person.name}</h3>
                                    <p className={classes.description}>{person.description}</p>
                                </div>
                            </div>
                        </SwiperSlide>

                    ))}
                </Swiper>
            </div>
        </div>
    )
}