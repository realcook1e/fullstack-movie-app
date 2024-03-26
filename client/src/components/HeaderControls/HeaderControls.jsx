import { Link, useNavigate } from "react-router-dom";
import Button from "../UI/Button/Button";
import styles from "./HeaderControls.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";

const HeaderControls = () => {
	const auth = useSelector(state => state.authSlice);
	const dispatch = useDispatch();
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
