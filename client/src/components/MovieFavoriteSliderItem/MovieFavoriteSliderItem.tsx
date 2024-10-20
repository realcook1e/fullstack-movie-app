import { Link } from "react-router-dom";
import {
	useGetMovieInfoQuery,
	useGetMoviePosterQuery,
} from "../../api/movies";
import styles from "./MovieFavoriteSliderItem.module.scss";
import { FC } from "react";

interface MovieFavoriteSliderItemProps {
	id: string;
}

const MovieFavoriteSliderItem: FC<MovieFavoriteSliderItemProps> = ({
	id,
}) => {
	const { data: poster } = useGetMoviePosterQuery(id);
	const { data: item } = useGetMovieInfoQuery(id);

	const ratingModClass =
		Number(item?.rating?.$numberDecimal) >= 7
			? styles.movieItem__rating_high
			: Number(item?.rating?.$numberDecimal) >= 4 &&
			  Number(item?.rating?.$numberDecimal) < 7
			? styles.movieItem__rating_medium
			: styles.movieItem__rating_low;

	return (
		<div className={styles.movieItem}>
			<Link to={`movies/${id}`}>
				<div
					className={styles.movieItem__content}
					title={item?.title}
				>
					<h3 className={styles.movieItem__title}>
						{item && item.title?.length > 17
							? item?.title?.slice(0, 17) + "..."
							: item?.title}
					</h3>
					<img
						src={poster}
						alt={item?.title}
					/>
				</div>
			</Link>
			<div className={`${styles.movieItem__rating} ${ratingModClass}`}>
				{item?.rating?.$numberDecimal}
			</div>
		</div>
	);
};

export default MovieFavoriteSliderItem;
