import { Link } from "react-router-dom";
import { FC } from "react";
import { useGetMoviePosterQuery } from "../../api/movies";
import styles from "./MovieItem.module.scss";
import { IMovieResponse } from "../../types/api.types";

interface MovieItemProps {
	movieInfo: IMovieResponse;
}

const MovieItem: FC<MovieItemProps> = ({ movieInfo }) => {
	const { data } = useGetMoviePosterQuery(movieInfo._id);
	const ratingModClass =
		Number(movieInfo.rating.$numberDecimal) >= 7
			? styles.movieItem__rating_high
			: Number(movieInfo.rating.$numberDecimal) >= 4 &&
			  Number(movieInfo.rating.$numberDecimal) < 7
			? styles.movieItem__rating_medium
			: styles.movieItem__rating_low;
	return (
		<div className={styles.movieItem}>
			<Link to={`${movieInfo._id}`}>
				<div
					className={styles.movieItem__content}
					title={movieInfo.title}
				>
					<h3 className={styles.movieItem__title}>
						{movieInfo.title.length > 19
							? movieInfo.title.slice(0, 19) + "..."
							: movieInfo.title}
					</h3>
					<img
						src={data}
						alt={movieInfo.title}
					/>
				</div>
			</Link>
			<div className={`${styles.movieItem__rating} ${ratingModClass}`}>
				{movieInfo.rating.$numberDecimal}
			</div>
		</div>
	);
};

export default MovieItem;
