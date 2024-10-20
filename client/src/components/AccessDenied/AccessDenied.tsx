import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./AccessDenied.module.scss";

interface AccessDeniedProps {
	preText: string;
}

const AccessDenied: FC<AccessDeniedProps> = ({ preText }) => {
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
