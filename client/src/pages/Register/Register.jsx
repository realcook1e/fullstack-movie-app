import RegisterForm from "../../components/RegisterForm/RegisterForm";
import styles from "./Register.module.scss";

const Register = () => {
	return (
		<div className='container'>
			<h2 className={styles.title}>Регистрация</h2>
			<RegisterForm />
		</div>
	);
};

export default Register;
