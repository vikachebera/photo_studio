import {useState} from "react";
import {useForm} from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classes from "./styles/BookingForm.module.css";

type BookingForm = {
    name: string;
    phone: string;
    room: string;
};

export default function BookingForm() {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {register, handleSubmit, reset, formState: {errors}} = useForm<BookingForm>();

    const onSubmit = async (data: BookingForm) => {
        if (!startDate || !endDate) {
            alert("Будь ласка, оберіть дату початку та завершення");
            return;
        }
        if (startDate >= endDate) {
            alert("Дата початку має бути раніше за дату завершення");
            return;
        }
        setIsSubmitting(true);
        try {
            const response = await fetch("http://localhost:5000/api/booking", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    ...data,
                    start: startDate.toISOString(),
                    end: endDate.toISOString(),
                }),
            });

            let result = {};
            if (response.ok) {
                const text = await response.text();
                if (text) {
                    result = JSON.parse(text);
                }
                alert(result || "Бронювання успішно збережено!");
            } else {
                alert(`Помилка: ${response.status} ${response.statusText}`);
            }
            reset();
            setStartDate(null);
            setEndDate(null);
        } catch (error) {
            console.error(error);
            alert("Помилка: " + (error instanceof Error ? error.message : "Невідома"));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={classes.container}>
            <h2 className={classes.title}>Забронювати зал</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.group}>
                    <label>Ім'я
                        <input {...register("name", {required: "Ім'я обов'язкове"})} className={classes.input}
                               disabled={isSubmitting}/>
                        {errors.name && <span>{errors.name.message}</span>}
                    </label>
                </div>
                <div className={classes.group}>
                    <label>Телефон
                        <input {...register("phone", {required: "Телефон обов'язковий"})} className={classes.input}
                               disabled={isSubmitting}/>
                        {errors.phone && <span>{errors.phone.message}</span>}
                    </label>
                </div>
                <div className={classes.group}>
                    <label>Зал
                        <select {...register("room", {required: "Виберіть зал"})} required className={classes.select}>
                            <option value="">Оберіть зал</option>
                            <option value="1">Зал Soft</option>
                            <option value="2">Зал Nude</option>
                            <option value="3">Зал Loft</option>
                        </select></label>
                </div>
                <div className={classes.group}>
                    <label>Початок
                        <DatePicker
                            selected={startDate}
                            onChange={setStartDate}
                            showTimeSelect
                            timeIntervals={30}
                            dateFormat="dd.MM.yyyy HH:mm"
                            placeholderText="Оберіть дату й час"
                            className={classes.input}
                            disabled={isSubmitting}
                        />
                    </label>
                </div>
                <div className={classes.group}>
                    <label>Кінець
                        <DatePicker
                            selected={endDate}
                            onChange={setEndDate}
                            showTimeSelect
                            timeIntervals={30}
                            dateFormat="dd.MM.yyyy HH:mm"
                            placeholderText="Оберіть дату й час"
                            className={classes.input}
                            disabled={isSubmitting}
                        />
                    </label>
                </div>
                <button type="submit" className={classes.submit} disabled={isSubmitting}>
                    {isSubmitting ? "Обробка..." : "Забронювати"}
                </button>
            </form>
        </div>
    );
}
