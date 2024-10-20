import { FC } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useGetFavoriteMoviesQuery } from "../../api/users";
import FavoriteMovieItem from "../FavoriteMovieItem/FavoriteMovieItem";
import styles from "./FavoritesMoviesList.module.scss";

const FavoritesMoviesList: FC = () => {
	const auth = useAppSelector(state => state.authSlice);
	const { data } = useGetFavoriteMoviesQuery(auth.username as string, {
		skip: !auth.isLogged,
	});

	return (
		<div className={styles.movieList}>
			<h2 className={styles.movieList__title}>Избранное</h2>
			<div className={styles.movieList__list}>
				{data?.map(movieId => (
					<FavoriteMovieItem
						key={movieId}
						movieId={movieId}
					/>
				))}
			</div>
		</div>
	);
};

export default FavoritesMoviesList;
