import { FC } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetUserInfoQuery } from "../../api/users";
import { useAppSelector } from "../../hooks/useAppSelector";
import styles from "./Profile.module.scss";

const Profile: FC = () => {
	const profileUsername = useParams().username;
	const auth = useAppSelector(state => state.authSlice);

	const { data, isError, isSuccess } = useGetUserInfoQuery(
		profileUsername as string,
		{ skip: !profileUsername }
	);

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
							<div className={styles.adminControls__title}>
								Админ панель:
							</div>
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
