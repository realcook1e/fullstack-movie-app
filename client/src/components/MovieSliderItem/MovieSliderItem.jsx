import { Link } from "react-router-dom";
import { useGetMoviePosterQuery } from "../../api/movies";
import styles from "./MovieSliderItem.module.scss";

const MovieSliderItem = ({ item }) => {
	const { data } = useGetMoviePosterQuery(item?._id);
	const ratingModClass =
		Number(item?.rating?.$numberDecimal) >= 7
			? styles.movieItem__rating_high
			: Number(item?.rating?.$numberDecimal) >= 4 && Number(item?.rating?.$numberDecimal) < 7
			? styles.movieItem__rating_medium
			: styles.movieItem__rating_low;

	return (
		<div className={styles.movieItem}>
			<Link to={`movies/${item?._id}`}>
				<div
					className={styles.movieItem__content}
					title={item?.title}
				>
					<h3 className={styles.movieItem__title}>
						{item?.title?.length > 17 ? item?.title?.slice(0, 17) + "..." : item?.title}
					</h3>
					<img src={data} />
				</div>
			</Link>
			<div className={`${styles.movieItem__rating} ${ratingModClass}`}>
				{item?.rating?.$numberDecimal}
			</div>
		</div>
	);
};

export default MovieSliderItem;
