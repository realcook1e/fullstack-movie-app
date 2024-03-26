import Button from "../UI/Button/Button";
import styles from "./HeaderControls.module.scss";

const HeaderControls = () => {
	return (
		<div className={styles.headerControls}>
			<Button
				className='primary'
				style={{ width: "120px" }}
			>
				Вход
			</Button>
			<Button
				className='secondary'
				style={{ width: "120px" }}
			>
				Регистрация
			</Button>
		</div>
	);
};
export default HeaderControls;
