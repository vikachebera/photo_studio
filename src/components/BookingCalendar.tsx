import classes from "./styles/BookingCalendar.module.css";
import {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Studio {
    id: string;
    name: string;
}

interface Booking {
    id: string;
    date: string;
    time_start: string;
    time_end: string;
    studio_id: string;
    price: number;
}

const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00",
    "18:00", "19:00", "20:00", "21:00", "22:00"
];

const getDaysArray = (startDate: Date, numDays = 7) => {
    const arr: Date[] = [];
    for (let i = 0; i < numDays; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        arr.push(date);
    }
    return arr;
};
const getDateKey = (date: Date | string) => {
    if (typeof date === 'string') {
        return date.split('T')[0]; // Беремо тільки дату з ISO формату
    }
    return date.toISOString().split('T')[0];
};
const isTimeSlotBooked = (booking: Booking, slot: string) => {
    const slotStart = parseInt(slot.split(':')[0]);
    const slotEnd = slotStart + 1;
    const bookingStart = parseInt(booking.time_start.split(':')[0]);
    const bookingEnd = parseInt(booking.time_end.split(':')[0]);

    return (bookingStart < slotEnd && bookingEnd > slotStart);
};

export default function BookingCalendar() {
    const [studios, setStudios] = useState<Studio[]>([]);
    const [selectedStudio, setSelectedStudio] = useState<string>("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(getDaysArray(new Date())[6]);
    const [days, setDays] = useState<Date[]>(getDaysArray(new Date()));
    const [bookingMap, setBookingMap] = useState<Record<string, Record<string, Booking>>>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStudios = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch("http://localhost:5000/api/studios");
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                if (Array.isArray(data)) {
                    setStudios(data);
                } else {
                    throw new Error("Очікувався масив студій");
                }
            } catch (err) {
                console.error("Помилка при завантаженні студій:", err);
                setError("Не вдалося завантажити студії");
                setStudios([]);
            } finally {
                setLoading(false);
            }
        };
        fetchStudios();
    }, []);

    useEffect(() => {
        if (!selectedStudio) return;

        const fetchBookings = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`http://localhost:5000/api/bookings?room_id=${selectedStudio}`);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data: Booking[] = await res.json();
                const map: Record<string, Record<string, Booking>> = {};

                data.forEach((booking) => {
                    const dateKey = getDateKey(booking.date);
                    if (!map[dateKey]) map[dateKey] = {};
                    map[dateKey][booking.id] = booking;
                });
                setBookingMap(map);
            } catch (err) {
                console.error("Помилка при завантаженні бронювань:", err);
                setError("Не вдалося завантажити бронювання");
                setBookingMap({});
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [selectedStudio]);

    useEffect(() => {
        const diffDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        setDays(getDaysArray(startDate, diffDays));
    }, [startDate, endDate]);

    function handleStudioChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedStudio(e.target.value);
    }

    return (
        <div className={classes.calendarContainer}>
            <h2 className={classes.title}>Календар бронювань</h2>

            {error && <div className={classes.error}>{error}</div>}
            {loading && <div className={classes.loading}>Завантаження...</div>}

            <div className={classes.controlsRow}>
                <div className={classes.studioSelector}>
                    <label htmlFor="studio-select">Студія:</label>
                    <select
                        id="studio-select"
                        value={selectedStudio}
                        onChange={handleStudioChange}
                        disabled={loading}
                    >
                        <option value="">Оберіть студію</option>
                        {studios.map((studio) => (
                            <option key={studio.id} value={studio.id}>
                                {studio.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={classes.datePickerGroup}>
                    <label>
                        Початкова дата: </label>

                    <DatePicker
                        selected={startDate}
                        onChange={(date) => date && setStartDate(date)}
                        dateFormat="dd.MM.yyyy"
                        disabled={loading}
                    />
                    <label>
                        Кінцева дата: </label>

                    <DatePicker
                        selected={endDate}
                        onChange={(date) => date && setEndDate(date)}
                        dateFormat="dd.MM.yyyy"
                        minDate={startDate}
                        disabled={loading}
                    />
                </div>
            </div>

            {selectedStudio && (
                <div className={classes.grid}>
                    <div className={classes.headerRow}>
                        <div className={classes.timeCell}></div>
                        {days.map((day, i) => (
                            <div key={i} className={classes.dayCell}>
                                {day.toLocaleDateString('uk-UA', {weekday: 'short', day: '2-digit', month: '2-digit'})}
                            </div>
                        ))}
                    </div>

                    {timeSlots.map((slot, rowIdx) => (
                        <div key={rowIdx} className={classes.row}>
                            <div className={classes.timeCell}>
                                {slot}–{(parseInt(slot.slice(0, 2)) + 1).toString().padStart(2, '0')}:00
                            </div>

                            {days.map((day, colIdx) => {
                                const dateKey = getDateKey(day);
                                const bookingsForDay = bookingMap[dateKey] ? Object.values(bookingMap[dateKey]) : [];
                                const isBooked = bookingsForDay.some(booking => isTimeSlotBooked(booking, slot));
                                const price = 900;

                                return (
                                    <div
                                        key={colIdx}
                                        className={isBooked ? classes.bookedCell : classes.freeCell}
                                    >
                                        {isBooked ? "❌" : `${price}₴`}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
