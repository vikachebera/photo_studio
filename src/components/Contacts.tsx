import classes from "./styles/Contacts.module.css";
import {useState} from "react";

export default function Contacts() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState("");
    const [isSubmited, setIsSubmited] = useState(false);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setError("");
        setIsSubmited(false);

        try {
            const res = await fetch("http://localhost:5000/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name, phone, email}),
            })

            const data = await res.json();
            if (!res.ok) {
                setError(data.message || "Щось пішло не так");
            } else {
                setIsSubmited(true);
                setName("");
                setPhone("");
                setEmail("");
            }
        } catch (err) {
            console.error("Помилка відправки форми:", err);
            setError("Помилка при відправці. Спробуйте ще раз пізніше.");
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.form}>
                <form onSubmit={handleSubmit}>

                    <h4>Форма для зв'язку</h4>
                    <label htmlFor="name">Ваше ім'я та прізвище
                        <input type="text"
                               id="name"
                               value={name}
                               onChange={(e) => setName(e.target.value)}
                               required
                        />
                    </label>
                    <label htmlFor="phone">Ваш номер мобільного
                        <input type="tel"
                               id="phone"
                               value={phone}
                               onChange={(e) => setPhone(e.target.value)}
                               required
                        />
                    </label>
                    <label htmlFor="email">Ваш емейл
                        <input type="email"
                               id="email"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               required
                        />
                    </label>

                    <button type='submit'>Відправити</button>
                </form>
            </div>

        </div>
    )
}