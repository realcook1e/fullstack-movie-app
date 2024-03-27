import { useSelector } from "react-redux";
import styles from "./UserItem.module.scss";
import { Link } from "react-router-dom";
import { useChangeRoleMutation } from "../../api/users";
import { useEffect, useRef, useState } from "react";

const UserItem = ({ user }) => {
	const [changeRole, changeResponse] = useChangeRoleMutation();
	const [message, setMessage] = useState("");
	const roleRef = useRef();

	const auth = useSelector(state => state.authSlice);

	useEffect(() => {
		if (changeResponse.status === "fulfilled") {
			setMessage("Роль изменена");
		}
		if (changeResponse.status === "rejected") {
			setMessage("Ошибка при изменении роли");
		}
	}, [changeResponse.status]);

	const changeRoleHandler = () => {
		const value = roleRef.current.value;
		const username = user.username;
		const confirm = window.confirm(`Изменить роль ${user.username} на ${value}?`);
		if (confirm) {
			changeRole({ username, value });
		}
	};

	return (
		<div className={styles.userItem}>
			<div className={styles.userItem__field}>
				<Link
					className={`${styles.userItem__link} ${styles.userItem__userLink}`}
					to={`/users/${user?.username}`}
				>
					{user?.username}
				</Link>
			</div>
			<div className={styles.userItem__field}>{user?.email}</div>
			<div className={styles.userItem__field}>{user?.role}</div>
			<div className={`${styles.userItem__field} ${styles.userItem__actionsField}`}>
				{auth?.role !== "admin" ? (
					<div className={styles.userItem__failure}>Недосаточно прав</div>
				) : (
					<div className={styles.userItem__actions}>
						<select
							ref={roleRef}
							name='role'
							defaultValue={user?.role}
						>
							<option value='user'>user</option>
							<option value='admin'>admin</option>
						</select>
						<span
							className={styles.userItem__link}
							onClick={changeRoleHandler}
						>
							Изменить
						</span>

						{message}
					</div>
				)}
			</div>
		</div>
	);
};

export default UserItem;
