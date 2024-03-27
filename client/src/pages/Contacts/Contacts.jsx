import ContactForm from "../../components/ContactForm/ContactForm";
import styles from "./Contacts.module.scss";

const Contacts = () => {
	return (
		<div className='container'>
			<h2 className={styles.title}>Обратная связь</h2>
			<ContactForm />
		</div>
	);
};

export default Contacts;
