import { Link, useParams } from "react-router-dom";
import { useGetUserInfoQuery } from "../../api/users";
import styles from "./Profile.module.scss";
import { useSelector } from "react-redux";

const Profile = () => {
	const profileUsername = useParams().username;
	const auth = useSelector(state => state.authSlice);

	const { data, isError, isSuccess } = useGetUserInfoQuery(profileUsername);

	return (
		<div className='container'>
			<h2 className={styles.title}>
				Профиль пользователя <span>{profileUsername}</span>
			</h2>
			{isError && <p>Ошибка получения данных пользователя</p>}
			{isSuccess && (
				<div className={styles.profile}>
					<div className={styles.profile__row}>
						<div className={styles.profile__title}>Логин:</div>
						<div className={styles.profile__value}>{data?.username}</div>
					</div>
					<div className={styles.profile__row}>
						<div className={styles.profile__title}>E-mail:</div>
						<div className={styles.profile__value}>{data?.email}</div>
					</div>
					<div className={styles.profile__row}>
						<div className={styles.profile__title}>Роль:</div>
						<div className={styles.profile__value}>{data?.role}</div>
					</div>

					{auth?.role === "admin" && (
						<div className={styles.profile__adminControls}>
							<div className={styles.adminControls__title}>Админ панель:</div>
							<Link
								to='/users'
								className={styles.adminControls__btn}
							>
								Пользователи
							</Link>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Profile;
