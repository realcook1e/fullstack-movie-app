import { useGetMovieInfoQuery, useGetMoviePosterQuery } from "../../api/movies";
import styles from "./MovieCard.module.scss";

const MovieCard = ({ movieId }) => {
	const { data } = useGetMovieInfoQuery(movieId);
	const { data: poster } = useGetMoviePosterQuery(movieId);
	const ratingModClass =
		Number(data?.rating.$numberDecimal) >= 7
			? styles.movieCard__rating_high
			: Number(data?.rating.$numberDecimal) >= 4 && Number(data?.rating.$numberDecimal) < 7
			? styles.movieCard__rating_medium
			: styles.movieCard__rating_low;

	return (
		<div className={styles.movieCard}>
			<div className={styles.movieCard__poster}>
				<img src={poster} />
				<div className={`${styles.movieCard__rating} ${ratingModClass}`}>
					{data?.rating?.$numberDecimal}
				</div>
			</div>
			<div className={styles.movieCard__content}>
				<div className={styles.movieCard__header}>
					<h2 className={styles.movieCard__title}>{data?.title}</h2>
					<span>Добавить в избранное</span>
				</div>
				<p className={styles.movieCard__description}>{data?.description}</p>
				<div className={styles.movieCard__info}>
					<div className={styles.movieCard__field}>
						<strong>Год:</strong> {data?.year}
					</div>
					<div className={styles.movieCard__field}>
						<strong>Страна:</strong> {data?.country}
					</div>
					<div className={styles.movieCard__field}>
						<strong>Жанр:</strong> {data?.genre}
					</div>
					<div className={styles.movieCard__field}>
						<strong>Режиссер:</strong> {data?.director}
					</div>
					<div className={styles.movieCard__field}>
						<strong>В ролях:</strong> {data?.casting}
					</div>
					<div className={styles.movieCard__field}>
						<strong>Продолжительность:</strong> {data?.duration} минут
					</div>
				</div>
			</div>
		</div>
	);
};

export default MovieCard;
