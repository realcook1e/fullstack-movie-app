import { Link } from "react-router-dom";
import { FC } from "react";
import { useGetAllMoviesQuery } from "../../api/movies";
import MovieItem from "../MovieItem/MovieItem";
import { useAppSelector } from "../../hooks/useAppSelector";
import styles from "./MovieList.module.scss";

const MovieList: FC = () => {
	const { data } = useGetAllMoviesQuery();
	const auth = useAppSelector(state => state.authSlice);

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
