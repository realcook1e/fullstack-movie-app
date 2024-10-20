import { FC, useEffect, useState } from "react";
import {
	useGetMovieInfoQuery,
	useGetMoviePosterQuery,
} from "../../api/movies";
import { useAppSelector } from "../../hooks/useAppSelector";
import { LuHeart } from "react-icons/lu";
import {
	useAddMovieToFavoritesMutation,
	useGetFavoriteMoviesQuery,
	useRemoveMovieFromFavoritesMutation,
} from "../../api/users";
import styles from "./MovieCard.module.scss";

interface MovieCardProps {
	movieId: string;
}

const MovieCard: FC<MovieCardProps> = ({ movieId }) => {
	const auth = useAppSelector(state => state.authSlice);

	const { data } = useGetMovieInfoQuery(movieId);
	const { data: poster } = useGetMoviePosterQuery(movieId);
	const [addToFavorites, addResponse] = useAddMovieToFavoritesMutation();
	const [removeFromFavorites, removeResponse] =
		useRemoveMovieFromFavoritesMutation();
	const { data: favorite_movies } = useGetFavoriteMoviesQuery(
		auth.username as string,
		{ skip: !auth.isLogged }
	);

	const [isFavorite, setIsFavorite] = useState<boolean>();

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
			: Number(data?.rating.$numberDecimal) >= 4 &&
			  Number(data?.rating.$numberDecimal) < 7
			? styles.movieCard__rating_medium
			: styles.movieCard__rating_low;

	const toggleFavoriteHandler = async () => {
		const findMovie = favorite_movies?.find(id => movieId === id);
		if (findMovie) {
			if (auth.username) {
				const res = await removeFromFavorites({
					username: auth.username,
					movieID: movieId,
				});
				setIsFavorite(false);
			}
		} else {
			if (auth.username) {
				const res = await addToFavorites({
					username: auth.username,
					movieID: movieId,
				});
				setIsFavorite(true);
			}
		}
	};

	const likeClass = isFavorite
		? `${styles.movieCard__like} ${styles.movieCard__like_active}`
		: `${styles.movieCard__like}`;

	return data ? (
		<div className={styles.movieCard}>
			<div className={styles.movieCard__poster}>
				<img
					src={poster}
					alt={data?.title}
				/>
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
				<p className={styles.movieCard__description}>
					{data?.description}
				</p>
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
	) : (
		<p className={styles.movieCard__notFound}>Страница не найдена</p>
	);
};

export default MovieCard;
