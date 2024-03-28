import { Link } from "react-router-dom";
import styles from "./CommentsItem.module.scss";
import { useGetUserInfoByIdQuery } from "../../api/users";

const CommentsItem = ({ info }) => {
	const { data: userData } = useGetUserInfoByIdQuery(info.userID);
	return (
		<div className={styles.commentsItem}>
			<div className={styles.commentsItem__info}>
				<Link
					to={`/users/${userData?.username}`}
					className={styles.commentsItem__link}
				>
					{userData?.username}
				</Link>
				<div className={styles.commentsItem__date}>
					{new Date(info.date).toLocaleString("ru-RU", {
						year: "numeric",
						month: "numeric",
						day: "numeric",
						hour: "numeric",
						minute: "numeric",
					})}
				</div>
			</div>
			<p className={styles.commentsItem__text}>{info.text}</p>
		</div>
	);
};

export default CommentsItem;
