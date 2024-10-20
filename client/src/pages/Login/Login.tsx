import { FC } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import styles from "./Login.module.scss";

const Login: FC = () => {
	return (
		<div className='container'>
			<h2 className={styles.title}>Вход</h2>
			<LoginForm />
		</div>
	);
};

export default Login;
