import { FC } from "react";
import FavoritesMoviesList from "../../components/FavoritesMoviesList/FavoritesMoviesList";

const Favorites: FC = () => {
	return (
		<div className='container'>
			<FavoritesMoviesList />
		</div>
	);
};

export default Favorites;
