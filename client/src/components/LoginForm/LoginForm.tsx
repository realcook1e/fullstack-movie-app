import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.scss";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useLoginMutation } from "../../api/auth";
import {
	isFetchBaseQueryError,
	isServerError,
} from "../../services/helpers";

const LoginForm = () => {
	const [login, response] = useLoginMutation();

	const navigate = useNavigate();
	useEffect(() => {
		if (response.isSuccess) {
			setTimeout(() => {
				navigate("/");
			}, 1500);
		}
	}, [response.isSuccess]);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const usernameChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
		setUsername(evt.target.value);
	};

	const passwordChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
		setPassword(evt.target.value);
	};

	const formSubmitHandler = async (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		if (password.trim().length > 3 && username.trim().length > 1) {
			setError("");
			try {
				const res = await login({ username, password });
				console.log(res);
			} catch (e) {
				console.log(e);
			}
		} else {
			setError("Пользователя с такими данным не существует");
		}
	};

	return (
		<form
			className={styles.loginForm}
			onSubmit={formSubmitHandler}
			method='post'
		>
			<input
				type='text'
				name='username'
				placeholder='Введите логин'
				value={username}
				onChange={usernameChangeHandler}
				className={styles.loginForm__input}
			/>
			<input
				type='password'
				name='password'
				placeholder='Введите пароль'
				value={password}
				onChange={passwordChangeHandler}
				className={styles.loginForm__input}
			/>
			{error && <p className={styles.loginForm__failure}>{error}</p>}
			{response.isError && (
				<p className={styles.loginForm__failure}>
					{isFetchBaseQueryError(response.error) &&
					isServerError(response.error.data)
						? response.error.data.message
						: "Неизвестная ошибка"}
				</p>
			)}
			{response.isSuccess && (
				<p className={styles.loginForm__success}>Авторизация успешна</p>
			)}
			<div className={styles.loginForm__buttons}>
				<button
					type='submit'
					className={`${styles.btnLogin}`}
				>
					Войти
				</button>
				<Link
					to='/register'
					className={`${styles.btnRegister}`}
				>
					Регистрация
				</Link>
			</div>
		</form>
	);
};

export default LoginForm;
