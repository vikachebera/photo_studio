import classes from "./styles/Contacts.module.css";
import { useState } from "react";

interface ContactFormData {
    name: string;
    phone: string;
    email: string;
}

interface SocialNetwork {
    name: string;
    icon: string;
    url: string;
    description: string;
}

export default function Contacts() {
    // State management
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        phone: '',
        email: '',
    });
    const [error, setError] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Social networks data
    const socialNetworks: SocialNetwork[] = [
        {
            name: "Telegram",
            icon: "/assets/telegram.png",
            url: "https://t.me/yourchannel",
            description: "Найсвіжіші фото залів та гарячі години зі знижками"
        },
        {
            name: "Instagram",
            icon: "/assets/instagram.png",
            url: "https://instagram.com/yourprofile",
            description: "Життя фотостудії у сторісах та актуальні новини"
        },
        {
            name: "Facebook",
            icon: "/assets/facebook.png",
            url: "https://facebook.com/yourpage",
            description: "Новини студії та анонси"
        }
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsSubmitted(false);
        setIsLoading(true);

        try {
            const res = await fetch("http://localhost:5000/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Щось пішло не так");
            }

            setIsSubmitted(true);
            setFormData({ name: '', phone: '', email: '' });
        } catch (err) {
            console.error("Помилка відправки форми:", err);
            setError(err instanceof Error ? err.message : "Помилка при відправці. Спробуйте ще раз пізніше.");
        } finally {
            setIsLoading(false);
        }
    };


    const ContactForm = () => (
        <form onSubmit={handleSubmit} className={classes.card}>
            <h4 className={classes.subTitle}>Форма для зв'язку</h4>
            <label htmlFor="name">
                Ваше ім'я та прізвище
                <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
            </label>
            <label htmlFor="phone">
                Ваш номер мобільного
                <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                />
            </label>
            <label htmlFor="email">
                Ваш емейл
                <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
            </label>

            <button type="submit" disabled={isLoading} className={classes.submitButton}>
                {isLoading ? "Відправка..." : "Відправити"}
            </button>

            {isSubmitted && (
                <p className={classes.success}>
                    Форма успішно відправлена! Ми зв'яжемося з вами найближчим часом.
                </p>
            )}

            {error && <p className={classes.error}>{error}</p>}
        </form>
    );

    const AddressInfo = () => (
        <div className={classes.card}>
            <h4 className={classes.subTitle}>Як нас знайти:</h4>
            <div className={classes.addressContent}>
                <p>м. Житомир</p>
                <p>вул. Шевченка 66</p>
                <p>Орієнтир входу: 4-й підїзд</p>
                <h4 className={classes.subTitle}>Номер для зв'язку:</h4>
                <a className={classes.link} href="tel:+380970000000">
                    +380970000000
                </a>
            </div>
        </div>
    );

    const SocialLinks = () => (
        <section className={classes.socialSection}>
            <h4 className={classes.subTitle}>Наші соцмережі</h4>
            <div className={classes.socialsContainer}>
                {socialNetworks.map((network) => (
                    <a
                        key={network.name}
                        href={network.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={classes.socialCard}
                        aria-label={network.name}
                    >
                        <img src={network.icon} alt={network.name} />
                        <p className={classes.socialDescription}>{network.description}</p>
                    </a>
                ))}
            </div>
        </section>
    );

    return (
        <div className={classes.container} id="contacts">
            <h2 className={classes.title}>Контакти</h2>
            <div className={classes.formContainer}>
                <ContactForm/>
                <AddressInfo/>
            </div>
            <SocialLinks/>
        </div>
    );
}