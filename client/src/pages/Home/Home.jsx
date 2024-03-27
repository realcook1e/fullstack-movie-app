import { useGetAllMoviesQuery } from "../../api/movies";
import MovieSlider from "../../components/MovieSlider/MovieSlider";
import styles from "./Home.module.scss";

const Home = () => {
	const { data } = useGetAllMoviesQuery();
	return (
		<div className='container'>
			<h2 className={styles.title}>Главная</h2>
			<MovieSlider
				title='Фильмы'
				items={data}
			/>
		</div>
	);
};

export default Home;
