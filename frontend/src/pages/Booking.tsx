import BookingCalendar from "../components/BookingCalendar.tsx";
import BookingForm from "../components/BookingForm.tsx";

import classes from "../components/styles/Booking.module.css";

export default function BookingPage() {
    return (
        <div className={classes.container}>
            <BookingForm/>
            <BookingCalendar/>
        </div>
    )
}