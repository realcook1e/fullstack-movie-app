import styles from "./AccessDenied.module.scss";
import { Link } from "react-router-dom";

const AccessDenied = ({ preText }) => {
	return (
		<div>
			<h3 className={styles.title}>Доступ заперещен</h3>
			<p className={styles.info}>
				{`${preText} `}
				<Link
					to='/login'
					className={styles.link}
				>
					войдите
				</Link>{" "}
				или{" "}
				<Link
					to='/register'
					className={styles.link}
				>
					зарегистрируйтесь
				</Link>
			</p>
		</div>
	);
};

export default AccessDenied;
