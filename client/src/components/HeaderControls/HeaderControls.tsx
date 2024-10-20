import { Link, useNavigate } from "react-router-dom";
import { FC } from "react";
import Button from "../UI/Button/Button";
import { logout } from "../../store/authSlice";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import styles from "./HeaderControls.module.scss";

const HeaderControls: FC = () => {
	const auth = useAppSelector(state => state.authSlice);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const logoutHandler = () => {
		dispatch(logout());
		navigate("/login");
	};

	return (
		<div className={styles.headerControls}>
			{auth.isLogged ? (
				<>
					<Link
						to={`/users/${auth.username}`}
						className={`${styles.headerControls__link} ${styles.headerControls__link_username}`}
					>
						{auth.username}
					</Link>{" "}
					|{" "}
					<span
						className={styles.headerControls__link}
						onClick={logoutHandler}
					>
						Выход
					</span>
				</>
			) : (
				<>
					<Button
						className='primary'
						style={{ width: "120px" }}
						onClick={() => {
							navigate("/login");
						}}
					>
						Вход
					</Button>
					<Button
						className='secondary'
						style={{ width: "120px" }}
						onClick={() => {
							navigate("/register");
						}}
					>
						Регистрация
					</Button>
				</>
			)}
		</div>
	);
};
export default HeaderControls;
