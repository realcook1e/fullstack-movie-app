import { FC } from "react";
import { useGetCommentsQuery } from "../../api/movies";
import { useAppSelector } from "../../hooks/useAppSelector";
import NewCommentForm from "../NewCommentForm/NewCommentForm";
import AccessDenied from "../AccessDenied/AccessDenied";
import CommentsItem from "../CommentsItem/CommentsItem";
import styles from "./Comments.module.scss";

interface CommentsProps {
	movieId: string;
}

const Comments: FC<CommentsProps> = ({ movieId }) => {
	const { data } = useGetCommentsQuery(movieId);
	const auth = useAppSelector(state => state.authSlice);

	return data && data.length ? (
		<div className={styles.comments}>
			<h3 className={styles.comments__title}>
				Комментарии ({data?.length})
			</h3>
			{auth.isLogged && auth.id ? (
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
	) : null;
};

export default Comments;
