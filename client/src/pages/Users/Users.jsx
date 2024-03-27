import { useGetAllUsersQuery } from "../../api/users";
import UserItem from "../../components/UserItem/UserItem";
import styles from "./Users.module.scss";
import { useSelector } from "react-redux";

const Users = () => {
	const auth = useSelector(state => state.authSlice);

	const { data, isError, isSuccess } = useGetAllUsersQuery();

	return (
		<div className='container'>
			<h2 className={styles.title}>Cписок пользователей</h2>
			{isError && <p>Ошибка получения списка пользователей</p>}
			{isSuccess && (
				<div className={styles.users}>
					<div className={styles.users__headers}>
						<div className={styles.users__headersTitle}>Логин</div>
						<div className={styles.users__headersTitle}>Email</div>
						<div className={styles.users__headersTitle}>Роль</div>
						<div
							className={`${styles.users__headersTitle} ${styles.users__actionsTitle}`}
						>
							Действия
						</div>
					</div>
					{data.map(user => (
						<UserItem
							key={user._id}
							user={user}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default Users;
