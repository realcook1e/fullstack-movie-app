import { Link } from "react-router-dom";
import { FC, useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useChangeRoleMutation } from "../../api/users";
import { IUser } from "../../types/api.types";
import styles from "./UserItem.module.scss";

interface UserItemProps {
	user: IUser;
}

const UserItem: FC<UserItemProps> = ({ user }) => {
	const [changeRole, changeResponse] = useChangeRoleMutation();
	const [message, setMessage] = useState("");
	const roleRef = useRef<HTMLSelectElement>(null);

	const auth = useAppSelector(state => state.authSlice);

	useEffect(() => {
		if (changeResponse.status === "fulfilled") {
			setMessage("Роль изменена");
		}
		if (changeResponse.status === "rejected") {
			setMessage("Ошибка при изменении роли");
		}
	}, [changeResponse.status]);

	const changeRoleHandler = () => {
		if (roleRef.current) {
			const value = roleRef.current.value as "admin" | "user";
			const username = user.username;
			const confirm = window.confirm(
				`Изменить роль ${user.username} на ${value}?`
			);
			if (confirm) {
				changeRole({ username, value });
			}
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
			<div
				className={`${styles.userItem__field} ${styles.userItem__actionsField}`}
			>
				{auth?.role !== "admin" ? (
					<div className={styles.userItem__failure}>Недосаточно прав</div>
				) : (
					<div className={styles.userItem__actions}>
						<select
							title='Выберите роль'
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
