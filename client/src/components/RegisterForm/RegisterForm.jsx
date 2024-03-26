import { useEffect, useState } from "react";
import styles from "./RegisterForm.module.scss";
import { useRegisterMutation } from "../../api/auth";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
	const [register, response] = useRegisterMutation();

	const navigate = useNavigate();
	useEffect(() => {
		if (response.isSuccess) {
			setTimeout(() => {
				navigate("/login");
			}, 1500);
		}
	}, [response.isSuccess]);

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordRepeat, setPasswordRepeat] = useState("");

	const [usernameError, setUsernameError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [passwordRepeatError, setPasswordRepeatError] = useState("");

	const isAllFilled = username && email && password && passwordRepeat ? true : false;

	const isDisabled =
		usernameError || emailError || passwordError || passwordRepeatError || !isAllFilled;

	// Change
	const usernameChangeHandler = evt => {
		setUsername(evt.target.value);
	};
	const emailChangeHandler = evt => {
		setEmail(evt.target.value);
	};
	const passwordChangeHandler = evt => {
		setPassword(evt.target.value);
	};
	const passwordRepeatChangeHandler = evt => {
		setPasswordRepeat(evt.target.value);
	};

	// Blur
	const usernameBlurHandler = evt => {
		if (evt.target.value.trim().length < 2) {
			setUsernameError("Логин должен содержать как минимум 2 символа");
		} else {
			setUsernameError("");
		}
	};
	const emailBlurHandler = evt => {
		if (!evt.target.value.includes("@")) {
			setEmailError("Некорректный email");
		} else {
			setEmailError("");
		}
	};
	const passwordBlurHandler = evt => {
		if (evt.target.value.trim().length < 4) {
			setPasswordError("Пароль должен содержать как минимум 4 символа");
		} else {
			setPasswordError("");
		}
	};
	const passwordRepeatBlurHandler = evt => {
		if (evt.target.value !== password) {
			setPasswordRepeatError("Пароли не совпадают");
		} else {
			setPasswordRepeatError("");
		}
	};

	const formSubmitHandler = async evt => {
		evt.preventDefault();
		try {
			const res = await register({ username, email, password });
			console.log(res);
		} catch (e) {
			console.log(e);
		}
	};

	const usernameClasses = usernameError
		? `${styles.registerForm__input} ${styles.registerForm__inputError}`
		: `${styles.registerForm__input}`;
	const emailClasses = emailError
		? `${styles.registerForm__input} ${styles.registerForm__inputError}`
		: `${styles.registerForm__input}`;
	const passwordClasses = passwordError
		? `${styles.registerForm__input} ${styles.registerForm__inputError}`
		: `${styles.registerForm__input}`;
	const passwordRepeatClasses = passwordRepeatError
		? `${styles.registerForm__input} ${styles.registerForm__inputError}`
		: `${styles.registerForm__input}`;

	return (
		<form
			className={styles.registerForm}
			onSubmit={formSubmitHandler}
			method='post'
		>
			{usernameError && <p className={styles.registerForm__failure}>{usernameError}</p>}
			<input
				type='text'
				name='username'
				placeholder='Введите логин'
				value={username}
				onChange={usernameChangeHandler}
				onBlur={usernameBlurHandler}
				className={usernameClasses}
			/>
			{emailError && <p className={styles.registerForm__failure}>{emailError}</p>}
			<input
				type='text'
				name='email'
				placeholder='Введите e-mail'
				value={email}
				onChange={emailChangeHandler}
				onBlur={emailBlurHandler}
				className={emailClasses}
			/>
			{passwordError && <p className={styles.registerForm__failure}>{passwordError}</p>}
			<input
				type='password'
				name='password'
				placeholder='Введите пароль'
				value={password}
				onChange={passwordChangeHandler}
				onBlur={passwordBlurHandler}
				className={passwordClasses}
			/>
			{passwordRepeatError && (
				<p className={styles.registerForm__failure}>{passwordRepeatError}</p>
			)}
			<input
				type='password'
				name='password-repeat'
				placeholder='Повторите пароль'
				value={passwordRepeat}
				onChange={passwordRepeatChangeHandler}
				onBlur={passwordRepeatBlurHandler}
				className={passwordRepeatClasses}
			/>

			{response.isError && (
				<p className={styles.registerForm__failure}>{response.error.data.message}</p>
			)}
			{response.isSuccess && (
				<p className={styles.registerForm__success}>Регистрация успешна</p>
			)}
			<button
				type='submit'
				className='btn-primary'
				disabled={isDisabled}
			>
				Регистрация
			</button>
		</form>
	);
};

export default RegisterForm;
