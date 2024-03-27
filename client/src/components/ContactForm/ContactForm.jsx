import { useState } from "react";
import { useSendMessageMutation } from "../../api/feedback";
import styles from "./ContactForm.module.scss";

const ContactForm = () => {
	const [sendMessage, response] = useSendMessageMutation();
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");

	const [error, setError] = useState("");

	const nameChangeHandler = evt => {
		setName(evt.target.value);
	};
	const phoneChangeHandler = evt => {
		setPhone(evt.target.value);
	};
	const emailChangeHandler = evt => {
		setEmail(evt.target.value);
	};
	const subjectChangeHandler = evt => {
		setSubject(evt.target.value);
	};
	const messageChangeHandler = evt => {
		setMessage(evt.target.value);
	};

	const formResetHandler = evt => {
		evt.preventDefault();
		setName("");
		setPhone("");
		setEmail("");
		setSubject("");
		setMessage("");
		setError("");
	};

	const formSubmitHandler = async evt => {
		evt.preventDefault();
		if (subject && message && email && name) {
			try {
				setError("");
				const res = await sendMessage({ name, email, subject, message, phone });
				console.log(res);
			} catch (e) {
				console.log(e);
			}
		} else {
			setError('Необходимо заполнить поля "Имя", "Email", "Тема", "Сообщение"');
		}
	};

	return (
		<form
			method='post'
			className={styles.contactForm}
			onSubmit={formSubmitHandler}
			onReset={formResetHandler}
		>
			<div className={styles.contactForm__group}>
				<input
					type='text'
					name='name'
					className={styles.contactForm__input}
					placeholder='Ваше имя'
					value={name}
					onChange={nameChangeHandler}
				></input>
				<input
					type='tel'
					name='phone'
					className={styles.contactForm__input}
					placeholder='Ваш номер телефона'
					value={phone}
					onChange={phoneChangeHandler}
				></input>
			</div>
			<input
				type='email'
				name='email'
				className={styles.contactForm__input}
				placeholder='Ваш email'
				value={email}
				onChange={emailChangeHandler}
			></input>
			<select
				name='subject'
				value={subject}
				onChange={subjectChangeHandler}
			>
				<option
					value=''
					disabled
				>
					Тема обращения
				</option>
				<option value='Проблема с сайтом'>Проблема с сайтом</option>
				<option value='Вопрос к администратору'>Вопрос к администратору</option>
				<option value='Другая проблема'>Другая проблема</option>
			</select>
			<textarea
				placeholder='Текст письма'
				rows={5}
				value={message}
				onChange={messageChangeHandler}
			></textarea>
			{response.isError && !error && !response.isSuccess && (
				<p className={styles.contactForm__failure}>{response.error.data.message}</p>
			)}
			{error && !response.isSuccess && !response.isError && (
				<p className={styles.contactForm__failure}>{error}</p>
			)}
			{response.isSuccess && !error && !response.isError && (
				<p className={styles.contactForm__success}>Сообщение отправлено</p>
			)}
			<div className={styles.contactForm__group}>
				<button
					type='submit'
					className={styles.btnSend}
				>
					Отправить
				</button>
				<button
					type='reset'
					className={styles.btnReset}
				>
					Сбросить
				</button>
			</div>
		</form>
	);
};

export default ContactForm;
