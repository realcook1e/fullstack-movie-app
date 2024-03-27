import { useParams } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";

const MovieDetails = () => {
	const { id } = useParams();
	return (
		<div className='container'>
			<MovieCard movieId={id} />
		</div>
	);
};

export default MovieDetails;
