import { useSelector } from "react-redux";
import { useGetAllMoviesQuery } from "../../api/movies";
import { useGetFavoriteMoviesQuery } from "../../api/users";
import MovieSlider from "../../components/MovieSlider/MovieSlider";
import styles from "./Home.module.scss";

const Home = () => {
	const auth = useSelector(state => state.authSlice);
	const { data: allMovies } = useGetAllMoviesQuery();

	const { data: favoriteMovies } = useGetFavoriteMoviesQuery(auth.username);
	return (
		<div className='container'>
			<h2 className={styles.title}>Главная</h2>
			<MovieSlider
				title='Фильмы'
				items={allMovies}
				type='movies'
			/>
			<MovieSlider
				title='Избранное'
				items={favoriteMovies}
				type='favorites'
			/>
		</div>
	);
};

export default Home;
