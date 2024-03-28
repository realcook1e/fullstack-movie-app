import { useGetMovieInfoQuery, useGetMoviePosterQuery } from "../../api/movies";
import { LuHeart } from "react-icons/lu";
import styles from "./MovieCard.module.scss";
import {
	useAddMovieToFavoritesMutation,
	useGetFavoriteMoviesQuery,
	useRemoveMovieFromFavoritesMutation,
} from "../../api/users";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const MovieCard = ({ movieId }) => {
	const auth = useSelector(state => state.authSlice);

	const { data } = useGetMovieInfoQuery(movieId);
	const { data: poster } = useGetMoviePosterQuery(movieId);
	const [addToFavorites, addResponse] = useAddMovieToFavoritesMutation();
	const [removeFromFavorites, removeResponse] = useRemoveMovieFromFavoritesMutation();
	const { data: favorite_movies } = useGetFavoriteMoviesQuery(auth.username);

	const [isFavorite, setIsFavorite] = useState();

	useEffect(() => {
		const findMovie = favorite_movies?.find(id => movieId === id);
		if (findMovie) {
			setIsFavorite(true);
		} else {
			setIsFavorite(false);
		}
		console.log(favorite_movies);
	}, [favorite_movies]);

	const ratingModClass =
		Number(data?.rating.$numberDecimal) >= 7
			? styles.movieCard__rating_high
			: Number(data?.rating.$numberDecimal) >= 4 && Number(data?.rating.$numberDecimal) < 7
			? styles.movieCard__rating_medium
			: styles.movieCard__rating_low;

	const toggleFavoriteHandler = async () => {
		const findMovie = favorite_movies?.find(id => movieId === id);
		if (findMovie) {
			const res = await removeFromFavorites({ username: auth.username, movieID: movieId });
			setIsFavorite(false);
			console.log(res);
		} else {
			const res = await addToFavorites({ username: auth.username, movieID: movieId });
			setIsFavorite(true);
			console.log(res);
		}
	};

	const likeClass = isFavorite
		? `${styles.movieCard__like} ${styles.movieCard__like_active}`
		: `${styles.movieCard__like}`;

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
					{auth.isLogged && (
						<LuHeart
							className={likeClass}
							onClick={toggleFavoriteHandler}
						/>
					)}
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
