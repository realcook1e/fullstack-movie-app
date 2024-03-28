import { Link } from "react-router-dom";
import styles from "./FavoritesMoviesList.module.scss";
import { useSelector } from "react-redux";
import { useGetFavoriteMoviesQuery } from "../../api/users";
import FavoriteMovieItem from "../FavoriteMovieItem/FavoriteMovieItem";

const FavoritesMoviesList = () => {
	const auth = useSelector(state => state.authSlice);
	const { data } = useGetFavoriteMoviesQuery(auth.username);

	console.log(data);
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
