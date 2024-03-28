import { useParams } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import Comments from "../../components/Comments/Comments";

const MovieDetails = () => {
	const { id } = useParams();
	return (
		<div className='container'>
			<MovieCard movieId={id} />
			<Comments movieId={id} />
		</div>
	);
};

export default MovieDetails;
