import { useSelector } from "react-redux";
import { useGetCommentsQuery } from "../../api/movies";
import styles from "./Comments.module.scss";
import NewCommentForm from "../NewCommentForm/NewCommentForm";
import AccessDenied from "../AccessDenied/AccessDenied";
import CommentsItem from "../CommentsItem/CommentsItem";

const Comments = ({ movieId }) => {
	const { data } = useGetCommentsQuery(movieId);
	const auth = useSelector(state => state.authSlice);

	console.log(data);
	return (
		<div className={styles.comments}>
			<h3 className={styles.comments__title}>Комментарии ({data?.length})</h3>
			{auth.isLogged ? (
				<NewCommentForm
					movieID={movieId}
					userID={auth.id}
				/>
			) : (
				<AccessDenied preText='Для добавления комментариев' />
			)}
			<div className={styles.comments__list}>
				{data?.map(commentInfo => (
					<CommentsItem
						key={commentInfo._id}
						info={commentInfo}
					/>
				))}
			</div>
		</div>
	);
};

export default Comments;
