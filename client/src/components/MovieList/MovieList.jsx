import { Link } from "react-router-dom";
import { useGetAllMoviesQuery } from "../../api/movies";
import MovieItem from "../MovieItem/MovieItem";
import styles from "./MovieList.module.scss";
import { useSelector } from "react-redux";

const MovieList = () => {
	const { data, isError, isSuccess } = useGetAllMoviesQuery();
	const auth = useSelector(state => state.authSlice);

	console.log(data);
	return (
		<div className={styles.movieList}>
			<h2 className={styles.movieList__title}>Список фильмов</h2>
			{auth.role === "admin" && (
				<Link
					to='add'
					className={styles.btnAdd}
				>
					Добавить фильм
				</Link>
			)}
			<div className={styles.movieList__list}>
				{data?.map(movie => (
					<MovieItem
						key={movie._id}
						movieInfo={movie}
					/>
				))}
			</div>
		</div>
	);
};

export default MovieList;
